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
# Enter your API key when prompted
gw config set apiKey

# Select your preferred LLM from available options
gw config set model
```

Your settings will be saved automatically to `~/.git-whisper/config.json`.

3. Start Using Git Whisper ❤️

```bash
# Generate and execute commit message
gw

# Use a specific LLM for message generation
gw --model anthropic/claude-3.5-sonnet

# Generate 5 commit messages interactively (preview only)
gw --interactive --commitCount 5 --dry-run

# View your current configuration
gw config view apiKey
gw config view model
```

## 🧪 Local Development

To set up Git Whisper for local testing:

1. Build the project:

   ```sh
   npm run build:watch
   ```

2. Create global link:

   ```sh
   node ./dist/index.js
   ```

3. Start using `git-whisper` or `gw` commands in your terminal.

## 🛠️ Built With

- Node.js
- OpenRouter API
