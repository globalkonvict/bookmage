const jwt = require("jsonwebtoken");


// Middleware to authenticate the user
// The middleware will check if the user is authenticated
// The middleware will check if the user has a valid token
// The token is sent in the Authorization header
// The token is received in the format "Bearer <token>"
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  const token = authHeader.replace("Bearer ", "");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
