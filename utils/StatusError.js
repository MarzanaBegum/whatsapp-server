const StatusError = (message, statusCode) => {
  let error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = { StatusError };
