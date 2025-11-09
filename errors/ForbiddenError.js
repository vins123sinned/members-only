class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    // when stringified, outputs "ForbiddenError: message" instead of "Error: message"
    this.name = "ForbiddenError";
  }
}

export { ForbiddenError };
