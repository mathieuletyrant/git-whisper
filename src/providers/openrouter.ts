import axios from 'axios';

const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'HTTP-Referer': '', // @TODO: Add your referer here
    'X-Title': 'git-whisper',
    'Content-Type': 'application/json',
  },
});
