const Custom_Error = require('./custom_error');
const Error = require('../error/error_messages');

module.exports = {
  sendErrorResponse: (res, error, errorCode = 400) => {
    if (error instanceof Custom_Error) {
      return res.status(errorCode).send(error.message);
    }
    return res.status(500).send(Error.UNEXPECTED_ERROR);
  }
};