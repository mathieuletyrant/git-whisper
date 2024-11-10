import { execSync } from 'child_process';

export class EmptyStagedError extends Error {
  constructor() {
    super();
    this.name = 'EmptyStagedError';
  }
}

export class GitProvider {
  /**
   * This function returns the staged changes in the git repository.
   * The function uses the `git diff --staged` command to get the staged changes.
   *
   * Possible errors:
   * Throw an EmptyStagedError if there are no staged changes.
   */
  public getStagedChanges(): string {
    const result = execSync('git diff --staged');

    if (result.length === 0) {
      throw new EmptyStagedError();
    }

    return result.toString();
  }

  /**
   * Create a git commit with the given message
   */
  public commit(message: string): void {
    const command = `git commit -m "${message}"`;

    execSync(command);
    return;
  }
}
