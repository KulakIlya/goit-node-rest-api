const errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  if (status) res.status(status).json({ message });
};

export default errorHandler;
