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

## 🧪 Testing Locally

To test Git Whisper locally, follow these steps:

1. Build the project:

   ```sh
   npm run build
   ```

2. Link the package globally:

   ```sh
   npm link
   ```

3. You can now use the `git-whisper` command in your terminal.

I'll help you add instructions for setting up git-whisper. Here's how you can format that section:

## 🚀 Setting up git-whisper

1. Install git-whisper globally using npm:

```bash
npm install git-whisper -g
```

2. Add the OpenRouter API key to your zprofile:

```bash
# Open ~/.zprofile in your preferred editor
echo 'export OPENROUTER_API_KEY="your-api-key-here"' >> ~/.zprofile
source ~/.zprofile
```

3. Add the git whisper alias to your git config:

```bash
# Add the alias to your global git config
git config --global alias.whisper 'git-whisper generate'
```

Now you can use `git whisper` command to automatically generate commit messages based on your changes.

Usage example:

```bash
# After making changes to your files
git add .
git whisper
# Review and confirm the generated commit message
```

Note: Make sure to replace "your-api-key-here" with your actual OpenRouter API key.

## 🛠️ Tech Stack

- NodeJS
- OpenRouter

## 🚧 Status

Currently in active development. Contributors welcome!

---

📄 License: MIT
