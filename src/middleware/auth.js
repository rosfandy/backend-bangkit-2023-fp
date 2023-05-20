const jwt = require("jsonwebtoken");
require('dotenv').config(); 

exports.verifyToken = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Token expired!",
        });
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    }

    req.user = { email: decoded.email };
    next();
  });
}


