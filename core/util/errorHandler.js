class GenericResponseError  {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

function throwError(message, code = 400) {
  throw new GenericResponseError(code, message);
}

module.exports = throwError;
