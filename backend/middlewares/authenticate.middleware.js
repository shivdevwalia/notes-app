const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.user = decoded.userID;
        next();
      } else {
        res.send({ msg: "Please Login" });
      }
    });
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = {
  authenticate,
};
