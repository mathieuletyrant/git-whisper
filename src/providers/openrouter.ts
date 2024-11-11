import axios, { AxiosInstance } from 'axios';

export class NotFollowStandardError extends Error {
  constructor(public readonly commitMessage: string) {
    super();
    this.name = 'NotFollowStandardError';
  }
}

export class UnknownError extends Error {
  constructor(public readonly cause: Error) {
    super();
    this.name = 'UnknownError';
  }
}

export class ParsingError extends Error {
  constructor(
    public name: string,
    public readonly cause?: Error,
  ) {
    super();
  }
}

type GenerationOptions = {
  numberOfCommitMessages: number;
};

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

  public async getAvailableModels(): Promise<{ [name: string]: string }> {
    const { data } = await this.openRouterClient.get<{ data: { id: string; name: string }[] }>('/models');

    return data.data.reduce<{ [name: string]: string }>((acc, model) => {
      acc[model.name] = model.id;
      return acc;
    }, {});
  }

  /**
   * This function returns the commit message based on the staged changes.
   *
   * Possible errors:
   * Throw a CommitMessageTooLongError if the commit message is longer than 50 characters.
   * Throw a ParsingError if the response is not a valid JSON.
   */
  public async getCommitMessages(staged: string, options: GenerationOptions, count: number = 0): Promise<string[]> {
    try {
      return await this.privateGetCommitMessage(staged, options);
    } catch (error) {
      if (error instanceof NotFollowStandardError && count <= this.MAX_RETRIES) {
        return this.getCommitMessages(staged, options, count + 1);
      }

      if (error instanceof ParsingError && count <= this.MAX_RETRIES) {
        return this.getCommitMessages(staged, options, count + 1);
      }

      throw new UnknownError(error as any);
    }
  }

  private async privateGetCommitMessage(staged: string, options: GenerationOptions): Promise<string[]> {
    const { data } = await this.openRouterClient.post<{
      choices: { message: { content: string } }[];
    }>('/chat/completions', {
      model: this.params.model,
      messages: [
        {
          role: 'user',
          content: `
            Your are an amazing developer! And you need based on the staged changes write a commit message

            The message should be short and descriptive and strictly follow the format below:
            <type>(<scope>): <description>

            Rules for commit message generation:
            1. Generate exactly ${options.numberOfCommitMessages} commit message options
            2. Use only these commit type:
              - feat: for new features
              - fix: for bug fixes
              - docs: for documentation changes
              - style: for formatting changes
              - refactor: for code restructuring
              - test: for adding tests
              - chore: for maintenance tasks
            3. Keep messages concise and descriptive
            4. Maximum length: 50 characters including prefix
            5. Answer me only with the commit messages in JSON format
            6. Example format: ["feat(auth): add user authentication", "fix(auth): resolve login bug", "docs(readme): update API docs"]

            Here's a guide to writing effective commit messages:
            - feat(auth): implement user authentication form
            - feat(auth): add OAuth2.0 integration
            - fix(api): resolve API request timeout
            - fix(core): handle null pointer exception
            - docs(readme): update installation steps
            - docs(api): add endpoint documentation
            - chore(deps): update dependencies
            - style(ui): improve button alignment
            - perf(query): optimize database queries
            - test(auth): add login unit tests
            - refactor(utils): simplify helper functions
            - ci(workflow): update GitHub Actions

            Here is the staged changes:
            ${staged}
          `,
        },
      ],
    });

    try {
      const commitMessages = JSON.parse(data.choices[0].message.content);

      if (!Array.isArray(commitMessages)) {
        throw new ParsingError('NotArrayError');
      }

      if (commitMessages.length !== options.numberOfCommitMessages) {
        throw new ParsingError('NotExpectedLengthError');
      }

      commitMessages.forEach((commitMessage: string) => {
        if (!/^(feat|fix|docs|style|refactor|test|chore)\(.+\): .+$/.test(commitMessage)) {
          throw new NotFollowStandardError(commitMessage);
        }
      });

      return commitMessages;
    } catch (error) {
      throw new ParsingError('NotValidJSONError', error as Error);
    }
  }
}
