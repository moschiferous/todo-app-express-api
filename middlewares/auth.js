const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization;
        req.loggedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
      } else {
        res.status(401).json({ message: "Invalid Authentication" });
      }
};

module.exports = verifyToken;