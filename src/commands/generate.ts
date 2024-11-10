import { GitProvider, OpenRouterProvider, EmptyStagedError, CommitMessageTooLongError, UnknownError, NotFollowStandardError } from '../providers/index.js';

/**
 * Command to generate a commit message based on staged changes.
 */
export const generateCommitMessage = async (config: { apiKey: string; model: string }) => {
  const openRouterProvider = new OpenRouterProvider(config);
  const gitProvider = new GitProvider();

  try {
    const staged = gitProvider.getStagedChanges();

    const commitMessage = await openRouterProvider.getCommitMessage(staged);

    gitProvider.commit(commitMessage);

    console.log('✅ Commit message generated and committed successfully.');
    console.log('📝', commitMessage);
  } catch (error) {
    if (error instanceof EmptyStagedError) {
      console.log('🚨 No staged changes found.');
    }

    if (error instanceof CommitMessageTooLongError) {
      console.log('🚨 The generated commit message is too long:', error.commitMessage);
    }

    if (error instanceof NotFollowStandardError) {
      console.log('🚨 The generated commit message does not follow the standard format:', error.commitMessage);
    }

    if (error instanceof UnknownError) {
      console.log('🚨 An unknown error occurred:', error.cause.message);
    }

    process.exit(1);
  }
};
