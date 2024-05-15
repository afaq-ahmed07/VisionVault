const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    req.user = null; // Set user to null if no token is found
    return next();
  }

  jwt.verify(token, 'Nevergiveup', (err, user) => {
    if (err) {
      req.user = null; // Set user to null if token is invalid
      return next();
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
