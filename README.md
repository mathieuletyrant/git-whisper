# Git Whisper 🤖✨

Meet Git Whisper, your AI-powered companion for crafting perfect Git commit messages. This intelligent CLI tool eliminates the hassle of writing commit messages by generating clear, conventional, and contextually relevant commits automatically.

## ✨ Key Features

- 🤖 Smart commit message generation powered by AI
- 💡 Flexibility to choose your preferred LLM (GPT-4, Claude, and more)
- 📝 Full compliance with conventional commit standards
- 🚀 Clean and user-friendly CLI interface
- 🔄 Intelligent code change analysis for context-aware messaging

## 🎯 Why Git Whisper?

Git Whisper revolutionizes your Git workflow by automating commit message creation. It helps developers maintain professional commit histories while reducing mental overhead and saving valuable time.

## 🚀 Getting Started

1. Install globally via npm:

```bash
npm install git-whisper -g
```

2. Set up with [OpenRouter](https://openrouter.ai):

```bash
# Set your APIKey of OpenRouter
gw config set apikey

# Choose LLM
gw config set model
```

Your settings will be saved automatically to `~/.git-whisper/config.json`.

3. Start Using Git Whisper ❤️

| Command                                      | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `gw`                                         | Generate and execute commit message                     |
| `gw --model anthropic/claude-3.5-sonnet`     | Use a specific LLM for message generation               |
| `gw --interactive --commitCount 5 --dry-run` | Generate 5 commit messages interactively (preview only) |
| `gw --language french`                       | Generate commit in french                               |
| `gw config view apiKey`                      | View your current API key configuration                 |
| `gw config view model`                       | View your current model configuration                   |

## 🧪 Local Development

To set up Git Whisper for local testing:

1. Build the project:

   ```sh
   npm run build:watch
   ```

2. Run the CLI

   ```sh
   node ./dist/index.js
   ```

## 🛠️ Built With

- Node.js
- OpenRouter API

## 📋 TODO

Here are some exciting features we're planning to add:

- 🎨 Custom commit message templates
- 🔄 Git hook integration for automated commits
- 📊 Commit history analysis and suggestions
- ⚡ Batch commit processing for multiple changes
