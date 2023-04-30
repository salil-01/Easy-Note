const express = require("express");
const { NotesModel } = require("../model/Notes.model");
const notesRouter = express.Router();

//to get all the notes of user
notesRouter.get("/", async (req, res) => {
  let { authorID } = req.body;
  //   console.log(authorID);
  if (authorID) {
    try {
      let notes = await NotesModel.find({ authorID });
      res.status(200).send({ msg: notes });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    res.status(200).send({ msg: "Please login to access your notes" });
  }
});
// to get a single note
notesRouter.get("/:id", async (req, res) => {
  const { authorID } = req.body;
  const { id } = req.params;
  // console.log(id);
  if (authorID) {
    try {
      let note = await NotesModel.find({ authorID: authorID, _id: id });
      res.status(200).send({ msg: note[0] });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    res.status(200).send({ msg: "Please login to access your notes" });
  }
});
notesRouter.post("/create", async (req, res) => {
  try {
    const note = new NotesModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New Note has been added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
notesRouter.patch("/edit/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NotesModel.findOne({ _id: noteID });
  const data = req.body;
  try {
    if (note.authorID === data.authorID) {
      await NotesModel.findByIdAndUpdate({ _id: noteID }, data);
      res.status(200).send({
        msg: `Note with id ${noteID} has been Updated Successfully`,
      });
    } else {
      res
        .status(200)
        .send({ msg: "You are not authorized to do this, Please login" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
notesRouter.delete("/delete/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NotesModel.findOne({ _id: noteID });
  const data = req.body;
  // console.log(noteID);
  try {
    if (note.authorID === data.authorID) {
      await NotesModel.findOneAndDelete({ _id: noteID });
      res.status(200).send({
        msg: `Note with id ${noteID} has been Deleted Successfully`,
      });
    } else {
      res
        .status(200)
        .send({ msg: "You are not authorized to do this,Please Login" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = { notesRouter };
