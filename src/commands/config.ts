import { Command } from 'commander';
import { Config, ConfigData } from '../config.js';

const setConfig = (key: keyof ConfigData, value: string) => {
  Config.updateConfig({ [key]: value });
  console.log(`✅ ${key} has been updated successfully.`);
};

const viewConfig = (key: keyof ConfigData) => {
  const config = Config.getConfig();
  const value = config[key];

  if (value) {
    console.log(`📝 ${key}:`, value);
  } else {
    console.log(`🚨 ${key}: Not configured`);
  }
};

export const registerConfigCommands = (program: Command) => {
  const configCommand = program.command('config').description('Configure Git Whisper');

  // Set commands
  const setCmd = configCommand.command('set').description('Set configuration values');
  setCmd
    .command('apiKey <value>')
    .description('Set the OpenRouter API key')
    .action((value) => setConfig('apiKey', value));
  setCmd
    .command('model <value>')
    .description('Set the default model')
    .action((value) => setConfig('model', value));

  // View commands
  const viewCmd = configCommand.command('view').description('View configuration values');
  viewCmd
    .command('apiKey')
    .description('View the configured API key')
    .action(() => viewConfig('apiKey'));
  viewCmd
    .command('model')
    .description('View the configured model')
    .action(() => viewConfig('model'));
};
