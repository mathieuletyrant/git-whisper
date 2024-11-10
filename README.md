# Git Whisper 🤖✨

Git Whisper is an intelligent CLI tool that generates meaningful and consistent commit messages using AI. Stop struggling with commit message writing and let AI help you create clear, concise, and conventional commits.

## ✨ Features

- 🤖 AI-powered commit message generation
- 📝 Follows conventional commit standards
- 🚀 Simple and intuitive CLI interface
- 🔄 Analyzes your code changes to provide context-aware messages
- 💡 Supports multiple languages and frameworks

## 🎯 Purpose

Git Whisper aims to streamline the git workflow by eliminating the cognitive load of writing commit messages. It helps developers maintain consistent and professional commit history while saving time.

## 📝 TODO

- Implement `gw config --api-key=<your-key>` command to easily set the OpenRouter API key without manually editing .zprofile
- _More items to be added as needed_

## 🚀 Setting up git-whisper

1. Install git-whisper globally using npm:

```bash
npm install git-whisper -g
```

2. Add the OpenRouter API key to your zprofile:

```bash
# Open ~/.zprofile in your preferred editor
echo 'export GIT_WHISPER_OPENROUTER_API_KEY="your-api-key-here"' >> ~/.zprofile
source ~/.zprofile
```

```bash
# Generate commit message
gw generate

# Generate commit message with another LLM
gw --model anthropic/claude-3.5-sonnet generat
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

- NodeJS
- OpenRouter
