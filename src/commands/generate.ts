import { Command } from 'commander';
import pkg from 'enquirer';

import { GitProvider, OpenRouterProvider, EmptyStagedError, ParsingError, UnknownError, NotFollowStandardError } from '../providers/index.js';
import { Config } from '../config.js';

// @ts-expect-error
const { AutoComplete } = pkg;

type OpenRouterConfig = {
  apiKey: string;
  model: string;
};

type GenerateConfig = {
  dryRun: boolean;
  interactive: boolean;
  commitCount: number;
  language: string;
};

/**
 * Command to generate a commit message based on staged changes.
 */
const generateCommitMessage = async (openRouterConfig: OpenRouterConfig, { commitCount, dryRun, interactive, language }: GenerateConfig) => {
  const openRouterProvider = new OpenRouterProvider(openRouterConfig);
  const gitProvider = new GitProvider();

  try {
    const staged = gitProvider.getStagedChanges();

    console.log('🤖 Generating...');

    const commitMessages = await openRouterProvider.getCommitMessages(staged, {
      commitCount,
      language,
    });

    // If interactive mode is enabled, prompt the user to select a commit message
    const selectedMessage = interactive ? await promptUserToSelectCommitMessage(commitMessages) : commitMessages[0];
    console.log(`📝 Selected commit message: ${selectedMessage}`);

    if (dryRun) {
      console.log('🚫 Dry run enabled. Skipping commit.');
      return;
    }

    gitProvider.commit(selectedMessage);
    console.log('✅ Commit message generated successfully.');
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

const promptUserToSelectCommitMessage = async (commitMessages: string[]): Promise<string> => {
  const prompt = new AutoComplete({
    message: 'Select a commit message:',
    limit: 10,
    choices: commitMessages,
  });

  return prompt.run();
};

export const registerGenerateCommand = (program: Command) => {
  program
    .description('Generate a commit message based on staged changes')
    .option('-m, --model <model>', 'Override the default model')
    .option('-d, --dry-run', 'Generate the commit message without committing', false)
    .option('-i, --interactive', 'Select a commit message interactively', false)
    .option('-c, --commitCount <number>', 'Number of commit messages to generate', '3')
    .option('-l, --language <language>', 'Language of the commit message', 'english')
    .action(() => {
      const config = Config.getConfig();
      const options = program.opts<{ model?: string; dryRun: boolean; interactive: boolean; commitCount: number; language: string }>();

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

      return generateCommitMessage(
        { apiKey: config.apiKey, model: options.model || config.model },
        {
          dryRun: options.dryRun,
          language: options.language,
          interactive: options.interactive,
          commitCount: Number(options.commitCount),
        },
      );
    });
};
