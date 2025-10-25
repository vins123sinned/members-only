const requiredErr = "is required";
const lengthErr = (maxLength, minLength = 1) =>
  `must be between ${minLength} and ${maxLength} characters`;

export { requiredErr, lengthErr };
