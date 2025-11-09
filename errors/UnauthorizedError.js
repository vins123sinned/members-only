class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    // when stringified, outputs "UnauthorizedError: message" instead of "Error: message"
    this.name = "UnauthorizedError";
  }
}

export { UnauthorizedError };
