export class FormBuilderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormBuilderError';
  }
}
