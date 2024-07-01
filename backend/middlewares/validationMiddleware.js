// Middleware to validate the request body against a Joi schema
// The middleware will check if the request body is valid
// The middleware will check if the request body matches the schema
// The schema is passed as an argument to the middleware
const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validationMiddleware;
