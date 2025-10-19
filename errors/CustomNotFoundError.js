class CustomNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    // when stringified, outputs "NotFoundError: message" instead of "Error: message"
    this.name = "NotFoundError";
  }
}

export { CustomNotFoundError };