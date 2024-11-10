import axios from 'axios';

import { CommitMessageTooLongError, NotFollowStandardError } from './openrouter.errors.js';

const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'HTTP-Referer': 'https://github.com/mathieuletyrant/git-whisper',
    'X-Title': 'git-whisper',
    'Content-Type': 'application/json',
  },
});

type OpenRouterProvider = {
  getCommitMessage(staged: string): Promise<string>;
};

export const openRouterProvider: OpenRouterProvider = {
  /**
   * This function returns the commit message based on the staged changes.
   *
   * Possible errors:
   * Throw a CommitMessageTooLongError if the commit message is longer than 50 characters.
   */
  async getCommitMessage(staged: string) {
    const { data } = await openRouterClient.post('/chat/completions', {
      model: 'anthropic/claude-3-5-haiku',
      messages: [
        {
          role: 'user',
          content: `
            Follow this strict format for your git message (max 50 characters):

            <type>(<scope>): <description>

            Available types:
            - feat: new feature
            - fix: bug fix
            - docs: documentation
            - style: formatting
            - refactor: refactoring
            - test: adding tests
            - chore: maintenance

            Example:
            feat(auth): add login form
            fix(api): fix timeout error
            docs(readme): update install

            Use only these prefixes and keep the message short and descriptive.
            Return only the commit message.

            Here are the pending changes:
            ${staged}
          `,
        },
      ],
    });

    const commitMessage: string = data.choices[0].message.content;

    if (commitMessage.length > 50) {
      throw new CommitMessageTooLongError(commitMessage);
    }

    if (
      commitMessage.startsWith('feat') ||
      commitMessage.startsWith('fix') ||
      commitMessage.startsWith('docs') ||
      commitMessage.startsWith('style') ||
      commitMessage.startsWith('refactor') ||
      commitMessage.startsWith('test') ||
      commitMessage.startsWith('chore')
    ) {
      throw new NotFollowStandardError(commitMessage);
    }

    return commitMessage;
  },
};
