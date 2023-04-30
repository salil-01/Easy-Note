const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/User.model");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    res.status(200).send({ msg: users });
  } catch (error) {
    res.status(400).send(error);
  }
});
userRouter.post("/register", async (req, res) => {
  //logic
  const { email, pass, age, name } = req.body;

  try {
    //hashing password
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (hash) {
        const user = new userModel({ name, age, email, pass: hash });
        await user.save();
        res.status(200).send({ msg: "New User has been registered" });
      } else {
        res.status(400).send(err);
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  //logic
  const { email, pass } = req.body;
  try {
    //finding user in database with the help of email
    const user = await userModel.findOne({ email });
    if (user) {
      //comparing the hashed password
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            //attaching userId of user as author ID and its name to token we will then use it after login
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: {
                authorID: user._id,
                author: user.name,
              },
            },
            process.env.secretKey
          );
          res
            .status(200)
            .send({ msg: "Login Successfull", token, user: user.name });
        } else {
          res.status(200).send({
            err: err,
            msg: "Invalid Credentials",
          });
        }
      });
    } else {
      res.status(200).send({ msg: "User Does Not Exist" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { userRouter };
