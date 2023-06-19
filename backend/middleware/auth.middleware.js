const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.secretKey, (error, decoded) => {
      if (decoded) {
        //getting author and author id from token and linking it to body
        (req.body.authorID = decoded.data.authorID),
          (req.body.author = decoded.data.author);
        next();
      } else {
        res.status(400).send({ err: error.message });
      }
    });
  } else {
    res.status(200).send("Please Login to access");
  }
};
module.exports = { auth };
