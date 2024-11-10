import { execSync } from 'child_process';

type GitProvider = {
  getStaged(): string;
};

class EmptyStagedError extends Error {
  constructor() {
    super();
    this.name = 'EmptyStagedError';
  }
}

export const gitProvider: GitProvider = {
  /**
   * This function returns the staged changes in the git repository.
   * The function uses the `git diff --staged` command to get the staged changes.
   *
   * Possible errors:
   * Throw an EmptyStagedError if there are no staged changes.
   */
  getStaged() {
    const result = execSync('git diff --staged');

    if (result.length === 0) {
      throw new EmptyStagedError();
    }

    return result.toString();
  },
};
