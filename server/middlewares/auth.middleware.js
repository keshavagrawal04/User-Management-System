const jwt = require("jsonwebtoken");

// FUNCTION : JWT Token Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "Unauthorized User" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: "Invalid Access Token" });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
