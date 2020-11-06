export const handleError = (err, res) => {
  const { name, statusCode, message } = err;

  if (name === 'ValidationError') return res.status(403).send(message);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
