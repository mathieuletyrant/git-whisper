export class EmptyStagedError extends Error {
  constructor() {
    super();
    this.name = 'EmptyStagedError';
  }
}
