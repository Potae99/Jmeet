const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.UserID = decoded.id; // Change to req.UserID
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.UserID).then(User => {
    if (!User) {
      return res.status(404).send({
        message: "User not found!"
      });
    }
    User.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          return next();
        }
      }
      return res.status(403).send({
        message: "Require Admin Role!"
      });
    }).catch(err => {
      console.error("Error getting roles:", err);
      res.status(500).send({
        message: "Internal Server Error"
      });
    });
  }).catch(err => {
    console.error("Error finding user:", err);
    res.status(500).send({
      message: "Internal Server Error"
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

module.exports = authJwt;
