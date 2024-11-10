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

2. Configure Git-Whisper:

```bash
gw config --apiKey your-api-key-here --model anthropic/claude-3-5-haiku
```

```bash
# Generate commit message
gw

# Generate commit message with another LLM
gw --model anthropic/claude-3.5-sonnet
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
