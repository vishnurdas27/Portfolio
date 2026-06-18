export function notFound(req, res) {
  res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }
  // Mongoose validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate value', keyValue: err.keyValue });
  }

  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Server error' });
}
