export class CommitHistoryService {
  private static defaultCommitHistory = [
    'feat(auth): add user authentication',
    'fix(auth): resolve login bug',
    'docs(readme): update installation steps',
    'style(ui): improve button alignment',
    'refactor(utils): simplify helper functions',
    'test(auth): add login unit tests',
    'chore(deps): update dependencies',
    'feat(api): add new endpoint',
    'fix(api): resolve 500 error',
    'docs(api): update swagger docs',
  ];

  /**
   * Returns a list of commit messages based on the commit history
   * If the commit history is less than 10, it will be filled with default commit messages
   */
  public static getCommitMessageHistory(commitHistory: string[]): string[] {
    const history = [...commitHistory];

    while (history.length < 10) {
      history.push(this.defaultCommitHistory[history.length % this.defaultCommitHistory.length]);
    }

    return history.slice(0, 10);
  }
}
