import { homedir } from 'os';
import { join } from 'path';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';

interface ConfigData {
  model: string;
  apiKey: string;
}

export class Config {
  private static readonly CONFIG_DIR = join(homedir(), 'git-whisper');
  private static readonly CONFIG_PATH = join(Config.CONFIG_DIR, 'config.json');

  private static defaultConfig: ConfigData = {
    model: '',
    apiKey: '',
  };

  public static initialize(): void {
    if (!existsSync(this.CONFIG_DIR)) {
      mkdirSync(this.CONFIG_DIR, { recursive: true });
    }

    if (!existsSync(this.CONFIG_PATH)) {
      this.saveConfig(this.defaultConfig);
    }
  }

  public static getConfig(): ConfigData {
    try {
      const configContent = readFileSync(this.CONFIG_PATH, 'utf-8');
      return JSON.parse(configContent);
    } catch (error) {
      return this.defaultConfig;
    }
  }

  public static saveConfig(config: ConfigData): void {
    writeFileSync(this.CONFIG_PATH, JSON.stringify(config, null, 2));
  }

  public static updateConfig(partial: Partial<ConfigData>): void {
    const currentConfig = this.getConfig();
    this.saveConfig({ ...currentConfig, ...partial });
  }
}
