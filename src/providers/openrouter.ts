import axios, { AxiosInstance } from 'axios';
import { retry, handleWhen } from 'cockatiel';

import { CommitMessageTooLongError, NotFollowStandardError } from './openrouter.errors.js';
import { CLIOptions } from '../types/cli.js';

const retryableErrors = [CommitMessageTooLongError, NotFollowStandardError];

const retryPolicy = retry(
  handleWhen((error) => retryableErrors.some((retryableError) => error instanceof retryableError)),
  { maxAttempts: 3 },
);

export class OpenRouterProvider {
  private openRouterClient: AxiosInstance;

  constructor(private readonly cliOptions: CLIOptions) {
    this.openRouterClient = axios.create({
      baseURL: 'https://openrouter.ai/api/v1',
      headers: {
        Authorization: `Bearer ${this.cliOptions.apiKey}`,
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
  public async getCommitMessage(staged: string): Promise<string> {
    return retryPolicy.execute(() => this.privateGetCommitMessage(staged));
  }

  private async privateGetCommitMessage(staged: string): Promise<string> {
    const { data } = await this.openRouterClient.post('/chat/completions', {
      model: this.cliOptions.model,
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
