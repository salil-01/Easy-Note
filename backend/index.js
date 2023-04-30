const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { auth } = require("./middleware/auth.middleware");
const { notesRouter } = require("./routes/Notes.routes");
const { userRouter } = require("./routes/User.routes");
const { NotesModel } = require("./model/Notes.model");
require("dotenv").config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

//Home Page
app.get("/", async (req, res) => {
  try {
    let allNotes = await NotesModel.find();
    res.status(200).send({ msg: allNotes });
  } catch (error) {
    res.status(400).send(error);
  }
});
//protected routes
app.use(auth);
app.use("/notes", notesRouter);

//server
app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while connecting to DB");
  }
  console.log(`Server running at ${process.env.PORT || 3000}`);
});
