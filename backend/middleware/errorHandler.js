export const notFoundHandler = (_req, _res, next) => {
  const err = new Error('Resource not found');
  err.statusCode = 404;
  next(err);
};

export const errorHandler = (err, _req, res, _next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const details = err.details || undefined;

  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message,
    ...(details && { details }),
  });
};
