import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line
const errorHandleMiddleware = (error, req, res, next) => {
  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong, try again later',
  };

  if (error?.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(
      error.keyValue,
    )} 重複`;
  }

  if (error.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(',');
  }

  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorHandleMiddleware;
