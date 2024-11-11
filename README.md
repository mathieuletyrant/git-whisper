# Git Whisper 🤖✨

Git Whisper is an intelligent CLI tool that generates meaningful and consistent commit messages using AI. Stop struggling with commit message writing and let AI help you create clear, concise, and conventional commits.

## ✨ Features

- 🤖 AI-powered commit message generation
- 📝 Follows conventional commit standards
- 🚀 Simple and intuitive CLI interface
- 🔄 Analyzes your code changes to provide context-aware messages
- 💡 Supports multiple languages and frameworks

## 🎯 Purpose

Git Whisper aims to streamline the Git workflow by eliminating the cognitive load of writing commit messages. It helps developers maintain a consistent and professional commit history while saving time.

## 🚀 Setting Up Git-Whisper

1. Install Git-Whisper globally using npm:

```bash
npm install git-whisper -g
```

2. Configure Git-Whisper [OpenRouter](https://openrouter.ai):

```bash
gw config set apiKey <your-api-key-here>
gw config set model anthropic/claude-3-5-haiku
```

This command will create a configuration file at `~/.git-whisper/config.json` to store your API key and preferred model settings.

3. Use the CLI ❤️

```bash
# Generate commit message and execute the git commit
gw

# Generate commit message with another LLM
gw --model anthropic/claude-3.5-sonnet

# Generate a commit without executing the git commit
gw --dry-run

# See the default configuration
gw config view apiKey
gw config view model
```

## 🧪 Testing Locally

To test Git Whisper locally, follow these steps:

1. Build the project:

   ```sh
   npm run build:watch
   ```

2. Link the package globally:

   ```sh
   npm link
   ```

3. You can now use the `git-whisper` or `gw` command in your terminal.

## 🛠️ Tech Stack

- Node.js
- OpenRouter
