const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/User.model");

const userRouter = express.Router();
// Schema Swagger
/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: Object
 *        required:
 *          -name
 *          -age
 *          -pass
 *          -email
 *        properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         age:
 *           type: number
 *           description: The age of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         pass:
 *           type: string
 *           description: The password of the user
 */
/**
 * @swagger
 *  components:
 *     schemas:
 *      UserLogin:
 *        type: Object
 *        required:
 *          -email
 *          -pass
 *        properties:
 *          email:
 *            type: string
 *            description: Email Of the user
 *          pass:
 *            type: string
 *            description: Password of the user
 */
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API for User Management
 */
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lists all the Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    res.status(200).send({ msg: users });
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /user/register:
 *           post:
 *              summary : Create a new User
 *              tags: [Users]
 *              requestBody:
 *                required: true
 *                content:
 *                  application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/User'
 *              responses:
 *                200:
 *                  description: The user was successfully registered
 *                  content:
 *                    application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/User'
 *                500:
 *                  description : Some Server Error
 */

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

/**
 * @swagger
 * /user/login:
 *           post:
 *              summary : Login a User
 *              tags: [Users]
 *              requestBody:
 *                required: true
 *                content:
 *                  application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/UserLogin'
 *              responses:
 *                200:
 *                  description: Login Successfull
 *                  content:
 *                    application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/UserLogin'
 *                500:
 *                  description : Some Server Error
 */
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
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
            sameSite: "lax",
          });
          // res.cookie("user", user.name, {
          //   httpOnly: true,
          //   secure: true,
          //   maxAge: 3600000,
          // });
          res.status(200).send({ msg: "Login Successfull", user: user.name });
        } else {
          res.status(401).send({
            err: err,
            msg: "Invalid Credentials",
          });
        }
      });
    } else {
      res.status(404).send({ msg: "User Does Not Exist" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { userRouter };
