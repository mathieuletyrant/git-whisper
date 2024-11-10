declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENROUTER_API_KEY: string;
      // Add other env variables here as needed
    }
  }
}

export {};
