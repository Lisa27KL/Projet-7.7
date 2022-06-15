const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "You need a token" });
  } else {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.MY_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Invalid Token" });
      }
      req.userId = decoded.id;
      next();
    });
  }
};


const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
