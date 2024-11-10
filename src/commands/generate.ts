import { GitProvider, OpenRouterProvider } from '../providers/index.js';

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

    console.log('Commit message generated and committed successfully.', commitMessage);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
