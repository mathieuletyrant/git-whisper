import axios, { AxiosInstance } from 'axios';

export class CommitMessageTooLongError extends Error {
  public readonly commitMessageLength: number;

  constructor(public readonly commitMessage: string) {
    super();
    this.name = 'CommitMessageTooLongError';
    this.commitMessageLength = commitMessage.length;
  }
}

export class NotFollowStandardError extends Error {
  constructor(public readonly commitMessage: string) {
    super();
    this.name = 'NotFollowStandardError';
  }
}

export class OpenRouterProvider {
  private MAX_RETRIES = 3;

  private openRouterClient: AxiosInstance;

  constructor(private readonly params: { apiKey: string; model: string }) {
    this.openRouterClient = axios.create({
      baseURL: 'https://openrouter.ai/api/v1',
      headers: {
        Authorization: `Bearer ${this.params.apiKey}`,
        'HTTP-Referer': 'https://github.com/mathieuletyrant/git-whisper',
        'X-Title': 'git-whisper',
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * This function returns the commit message based on the staged changes.
   *
   * Possible errors:
   * Throw a CommitMessageTooLongError if the commit message is longer than 50 characters.
   * Throw a NotFollowStandardError if the commit message does not follow the standard format.
   */
  public async getCommitMessage(staged: string, count: number = 0): Promise<string> {
    try {
      return await this.privateGetCommitMessage(staged);
    } catch (error) {
      if (error instanceof CommitMessageTooLongError && count <= this.MAX_RETRIES) {
        return this.getCommitMessage(staged, count + 1);
      }
      if (error instanceof NotFollowStandardError && count <= this.MAX_RETRIES) {
        return this.getCommitMessage(staged, count + 1);
      }

      throw error;
    }
  }

  private async privateGetCommitMessage(staged: string): Promise<string> {
    const { data } = await this.openRouterClient.post('/chat/completions', {
      model: this.params.model,
      messages: [
        {
          role: 'user',
          content: `
            Your are an amazing developer! And you need based on the staged changes write a commit message

            The message should be short and descriptive and strictly follow the format below:
            <type>(<scope>): <description>

            Here is the list of types you can use:
            - feat: new feature
            - fix: bug fix
            - docs: documentation
            - style: formatting
            - refactor: refactoring
            - test: adding tests
            - chore: maintenance

            Example that works:
            - feat(auth): add login form
            - fix(api): fix timeout error
            - docs(readme): update install

            Rules for you to follow: 
            - Use only these prefixes and keep the message short and descriptive.
            - Return only the commit message.
            - The message your return should not be longer than 50 characters.    
            - If the message is longer than 50 characters, try again.        

            Here is the staged changes:
            ${staged}
          `,
        },
      ],
    });

    const commitMessage: string = data.choices[0].message.content;

    if (commitMessage.length > 50) {
      throw new CommitMessageTooLongError(commitMessage);
    }

    if (['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'].every((type) => !commitMessage.startsWith(type))) {
      throw new NotFollowStandardError(commitMessage);
    }

    return commitMessage;
  }
}
