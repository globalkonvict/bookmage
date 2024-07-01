// Middleware to handle errors
// The errorMiddleware will catch any errors that occur in the application
// The errorMiddleware will log the error to the console
// The errorMiddleware will send a response with the error message to the client with a status code of 500
const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};

module.exports = errorMiddleware;
