export class CommitMessageTooLongError extends Error {
  public readonly commitMessageLength: number;

  constructor(public readonly commitMessage: string) {
    super();
    this.name = 'CommitMessageTooLongError';
    this.commitMessageLength = commitMessage.length;
  }
}

export class NotFollowStandardError extends Error {
  constructor(public readonly commitMessage: string) {
    super();
    this.name = 'NotFollowStandardError';
  }
}
