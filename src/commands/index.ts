import { Command } from 'commander';

import { registerConfigCommands } from './config.js';
import { registerHelpCommand } from './help.js';
import { registerGenerateCommand } from './generate.js';

/**
 * Register all commands.
 */
export const registerCommands = (program: Command) => {
  registerGenerateCommand(program); // Default command
  registerConfigCommands(program);
  registerHelpCommand(program);
};
