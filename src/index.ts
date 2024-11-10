#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .version('1.0.0')
  .description('A CLI tool to generate a commit based on stash changes');

program.parse(process.argv);


