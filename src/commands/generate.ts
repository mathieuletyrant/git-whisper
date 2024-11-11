import { Command } from 'commander';
import pkg from 'enquirer';

import { GitProvider, OpenRouterProvider, EmptyStagedError, ParsingError, UnknownError, NotFollowStandardError } from '../providers/index.js';
import { Config } from '../config.js';

// @ts-expect-error
const { AutoComplete } = pkg;

/**
 * Command to generate a commit message based on staged changes.
 */
const generateCommitMessage = async (config: {
  apiKey: string;
  model: string;
  dryRun: boolean;
  interactive: boolean;
  numberOfCommitMessages: number;
}) => {
  const openRouterProvider = new OpenRouterProvider(config);
  const gitProvider = new GitProvider();

  try {
    const staged = gitProvider.getStagedChanges();

    const commitMessages = await openRouterProvider.getCommitMessages(staged, {
      numberOfCommitMessages: config.numberOfCommitMessages,
    });
    let commitMessage = commitMessages[0];

    if (config.dryRun) {
      console.log('✅ Commit message generated successfully.');
      for (const commitMessage of commitMessages) {
        console.log('📝', commitMessage);
      }
      return;
    }

    if (config.interactive) {
      const prompt = new AutoComplete({
        message: 'Select a commit message:',
        limit: 10,
        choices: commitMessages,
      });

      commitMessage = await prompt.run();
    }

    gitProvider.commit(commitMessage);
    console.log('✅ Commit message committed successfully.');
    console.log('📝', commitMessage);
  } catch (error) {
    if (error instanceof EmptyStagedError) {
      console.log('🚨 No staged changes found.');
    }

    if (error instanceof ParsingError) {
      console.log('🚨 The response from the API could not be parsed:', error.message);
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
    .option('-d, --dry-run', 'Generate the commit message without committing', false)
    .option('-i, --interactive', 'Select a commit message interactively', false)
    .option('-n, --numberOfCommitMessages <number>', 'Number of commit messages to generate', '3')
    .action(() => {
      const config = Config.getConfig();
      const options = program.opts<{ model?: string; dryRun: boolean; interactive: boolean; numberOfCommitMessages: number }>();

      console.log('🤖 Generating...');

      if (!config.apiKey) {
        console.log('Please configure an API key.');
        console.log('➡️ gw config set apiKey');
        return;
      }

      if (!options.model && !config.model) {
        console.log('Please specify a model or configure a default model.');
        console.log('➡️ gw config set model');
        return;
      }

      return generateCommitMessage({ ...config, ...options });
    });
};
