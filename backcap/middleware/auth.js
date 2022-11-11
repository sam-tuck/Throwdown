require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, authData) => {
      if (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
          res.sendStatus(401);
        } else {
          res.status(403).json({
            error: "Invalid token",
          });
        }
      } else {
        req.userAuthData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403).json({
      error: "No token provided",
    });
  }
}

module.exports = verifyToken;
