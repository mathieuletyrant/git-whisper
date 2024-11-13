#!/usr/bin/env node
import { Command } from 'commander';

import { registerCommands } from './commands/index.js';
import { Config } from './config.js';

Config.initialize();

const program = new Command();

program
  .version('1.3.0')
  .description(
    'Git Whisper is an intelligent CLI tool that generates meaningful and consistent commit messages using AI. Stop struggling with commit message writing and let AI help you create clear, concise, and conventional commits.',
  );

registerCommands(program);

program.parse(process.argv);
