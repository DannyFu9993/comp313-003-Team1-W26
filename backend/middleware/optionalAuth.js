const jwt = require("jsonwebtoken");

/**
 * Attaches req.user when a valid JWT is present; otherwise req.user is undefined.
 * Does not send 401 — intended for routes that behave differently for guests vs customers.
 */
module.exports = function optionalAuth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    req.user = undefined;
    return next();
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded.user;
  } catch {
    req.user = undefined;
  }
  next();
};
