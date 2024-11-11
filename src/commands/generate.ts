import { Command } from 'commander';

import {
  GitProvider,
  OpenRouterProvider,
  EmptyStagedError,
  CommitMessageTooLongError,
  UnknownError,
  NotFollowStandardError,
} from '../providers/index.js';
import { Config } from '../config.js';

/**
 * Command to generate a commit message based on staged changes.
 */
const generateCommitMessage = async (config: { apiKey: string; model: string; dryRun: boolean }) => {
  const openRouterProvider = new OpenRouterProvider(config);
  const gitProvider = new GitProvider();

  try {
    const staged = gitProvider.getStagedChanges();

    const commitMessage = await openRouterProvider.getCommitMessage(staged);

    if (config.dryRun) {
      console.log('✅ Commit message generated successfully.');
    } else {
      gitProvider.commit(commitMessage);
      console.log('✅ Commit message generated and committed successfully.');
    }

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

export const registerGenerateCommand = (program: Command) => {
  program
    .description('Generate a commit message based on staged changes')
    .option('-m, --model <model>', 'Override the default model')
    .option('--dry-run', 'Generate the commit message without committing', false)
    .action(() => {
      const config = Config.getConfig();
      const options = program.opts<{ model?: string; dryRun: boolean }>();

      console.log('🤖 Generating a commit message...');

      if (!config.apiKey) {
        console.log('Please configure an API key.');
        console.log('➡️ gw config set apiKey <apiKey');
        return;
      }

      if (!options.model && !config.model) {
        console.log('Please specify a model or configure a default model.');
        console.log('➡️ gw config set model <model>');
        return;
      }

      return generateCommitMessage({ ...config, ...options });
    });
};
