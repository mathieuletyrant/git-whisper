import { execSync } from 'child_process';

export class EmptyStagedError extends Error {
  constructor() {
    super();
    this.name = 'EmptyStagedError';
  }
}

export class GitProvider {
  private LAST_COMMIT_COUNT = 10;

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

  /**
   * Add all the changes in the repository
   */
  public addAll(): void {
    execSync('git add .');
    return;
  }

  /**
   * Push the changes to the remote repository
   */
  public push(): void {
    execSync('git push');
    return;
  }

  /**
   * Get the commit history of the repository
   */
  public getCommitMessageHistory(): string[] {
    const result = execSync(`git log -${this.LAST_COMMIT_COUNT} --pretty=%B`);

    return result.toString().split('\n').filter(Boolean);
  }
}
