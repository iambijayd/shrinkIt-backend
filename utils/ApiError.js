class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", err = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = err;
    this.success = false;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
