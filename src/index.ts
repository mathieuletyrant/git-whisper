#!/usr/bin/env node
import { Command } from 'commander';

import { CLIOptions } from './types/cli.js';

import { generateCommitMessage } from './commands/generate.js';

const program = new Command();

const options = program.opts<CLIOptions>();

program
  .version('1.0.0')
  .description(
    'Git Whisper is an intelligent CLI tool that generates meaningful and consistent commit messages using AI. Stop struggling with commit message writing and let AI help you create clear, concise, and conventional commits.',
  )
  .option('--apiKey, <apiKey>', 'Specify the API key for OpenRouter', process.env.GIT_WHISPER_OPENROUTER_API_KEY)
  .option('--model <model>', 'Specify the model to use', 'anthropic/claude-3-5-haiku');

program
  .command('generate')
  .description('Generate a commit message based on staged changes')
  .action(() => {
    return generateCommitMessage(options);
  });

// Set the default command to 'generate'
program.action(() => {
  return generateCommitMessage(options);
});

program.parse(process.argv);
