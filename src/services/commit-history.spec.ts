import { describe, it, expect } from 'vitest';

import { CommitHistoryService } from './commit-history.js';

describe('CommitHistoryService', () => {
  it('should return exactly 10 commit messages', () => {
    const result = CommitHistoryService.getCommitMessageHistory([]);
    expect(result).toHaveLength(10);
  });

  it('should preserve provided commit messages', () => {
    const inputHistory = ['custom commit 1', 'custom commit 2'];
    const result = CommitHistoryService.getCommitMessageHistory(inputHistory);

    expect(result[0]).toBe('custom commit 1');
    expect(result[1]).toBe('custom commit 2');
  });

  it('should fill remaining slots with default commits when input is less than 10', () => {
    const inputHistory = ['custom commit'];
    const result = CommitHistoryService.getCommitMessageHistory(inputHistory);

    expect(result[0]).toBe('custom commit');
    expect(result).toHaveLength(10);
    expect(result[1]).toBe(CommitHistoryService['defaultCommitHistory'][1]);
  });

  it('should only return first 10 commits when input is larger', () => {
    const inputHistory = Array(15).fill('custom commit');
    const result = CommitHistoryService.getCommitMessageHistory(inputHistory);

    expect(result).toHaveLength(10);
    expect(result.every((msg) => msg === 'custom commit')).toBe(true);
  });
});
