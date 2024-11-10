export class CommitMessageTooLongError extends Error {
  constructor(public readonly commitMessage: string) {
    super();
    this.name = 'CommitMessageTooLongError';
  }
}

export class NotFollowStandardError extends Error {
  constructor(public readonly commitMessage: string) {
    super();
    this.name = 'NotFollowStandardError';
  }
}
