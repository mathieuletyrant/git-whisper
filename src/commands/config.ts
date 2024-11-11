import { Command } from 'commander';
import pkg from 'enquirer';
import { Config, ConfigData } from '../config.js';
import { OpenRouterProvider } from '../providers/openrouter.js';

// @ts-expect-error
const { AutoComplete } = pkg;

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
    .command('model')
    .description('Set the default model, it will prompt you to select a model')
    .action(async () => {
      const openRouterProvider = new OpenRouterProvider(Config.getConfig());

      const availableModels = await openRouterProvider.getAvailableModels();

      const prompt = new AutoComplete({
        message: 'Select a model:',
        limit: 10,
        initial: 0,
        choices: Object.keys(availableModels),
      });

      try {
        const answer = await prompt.run();
        setConfig('model', availableModels[answer]);
      } catch (error) {
        console.log('🚨 An error occurred during model selection.');
      }
    });

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
