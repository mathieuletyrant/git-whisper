import { GitProvider, OpenRouterProvider } from '../providers/index.js';
import { CLIOptions } from '../types/cli.js';

/**
 * Command to generate a commit message based on staged changes.
 */
export const generateCommitMessage = async (cliOptions: CLIOptions) => {
  const openRouterProvider = new OpenRouterProvider(cliOptions);
  const gitProvider = new GitProvider();

  try {
    const staged = gitProvider.getStagedChanges();

    const result = await openRouterProvider.getCommitMessage(staged);

    gitProvider.commit(result);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
