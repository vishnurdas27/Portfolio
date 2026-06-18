// Wraps an async route handler so rejected promises are forwarded to Express'
// error handler instead of crashing the process (needed on Express 4).
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
