class UnsupportedFileError extends Error {
  public constructor() {
    super('Unsupported file.');
    this.name = 'UnsupportedFileError';
  }
}

export default UnsupportedFileError;
