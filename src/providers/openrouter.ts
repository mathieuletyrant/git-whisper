import axios from 'axios';

const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'X-Title': 'git-whisper',
  },
});
