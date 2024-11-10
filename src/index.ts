#!/usr/bin/env node

import { gitProvider, openRouterProvider } from './providers/index.js';

const staged = gitProvider.getStaged();

const result = await openRouterProvider.getCommitMessage(staged);

console.log(JSON.stringify(result, null, 2));
