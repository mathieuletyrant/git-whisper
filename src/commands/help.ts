import { Command } from 'commander';

export const registerHelpCommand = (program: Command) => {
  program
    .command('help')
    .description('Display help information and usage examples')
    .action(() => {
      program.help();
    });
};
