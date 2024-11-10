#!/usr/bin/env node
import { Command } from 'commander';

import { generateCommitMessage } from './commands/generate.js';
import { Config } from './config.js';

Config.initialize();

const program = new Command();

program
  .version('1.0.7')
  .description(
    'Git Whisper is an intelligent CLI tool that generates meaningful and consistent commit messages using AI. Stop struggling with commit message writing and let AI help you create clear, concise, and conventional commits.',
  )
  .description('Generate a commit message based on staged changes')
  .option('-m, --model <model>', 'Override the default model')
  .action(() => {
    const config = Config.getConfig();
    const options = program.opts<{ model?: string }>();

    if (!config.apiKey) {
      console.error('Please configure Git Whisper with an API key.');
      return;
    }

    if (!options.model && !config.model) {
      console.error('Please specify a model or configure a default model.');
      return;
    }

    return generateCommitMessage({ ...config, ...options });
  });

program
  .command('config')
  .description('Configure Git Whisper')
  .requiredOption('-k, --apiKey <apiKey>', 'Specify the OpenRouter API key')
  .requiredOption('-m, --model <model>', 'Specify the model to use')
  .action((options) => {
    Config.updateConfig(options);
  });

program.parse(process.argv);
