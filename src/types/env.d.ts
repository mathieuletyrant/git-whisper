declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GIT_WHISPER_OPENROUTER_API_KEY: string;
    }
  }
}
