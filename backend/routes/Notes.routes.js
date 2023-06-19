const express = require("express");
const { NotesModel } = require("../model/Notes.model");
const notesRouter = express.Router();

// Schema Swagger
/**
 * @swagger
 * components:
 *    schemas:
 *      Note:
 *        type: Object
 *        required:
 *          -title
 *          -body
 *          -description
 *        properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         title:
 *           type: string
 *           description: The title of the user
 *         body:
 *           type: string
 *           description: The body of the user
 *         description:
 *           type: string
 *           description: The description of the user
 *         authorID:
 *           type: string
 *           description: Id of Author
 *         author:
 *           type: string
 *           description: Name of the Author
 */

/**
 * @swagger
 * tags:
 *  name: Notes
 *  description: API for Notes Management
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Lists all the Notes of a User
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: The list of the all the notes of user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
//to get all the notes of user
notesRouter.get("/", async (req, res) => {
  let { authorID } = req.body;
  //   console.log(authorID);
  let { title } = req.query;
  let obj = {};
  title ? (obj.title = { $regex: title, $options: "i" }) : null;
  if (authorID) {
    obj.authorID = authorID;
    try {
      let notes = await NotesModel.find(obj);
      res.status(200).send({ msg: notes });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    res.status(200).send({ msg: "Please login to access your notes" });
  }
});

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get the note by id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Note id
 *     responses:
 *       200:
 *         description: The note response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: The Note was not found
 */
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
/**
 * @swagger
 * /notes/edit/{id}:
 *   patch:
 *    summary: Update the Note by the id
 *    tags: [Notes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The note id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Note'
 *    responses:
 *      200:
 *        description: The note was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Note'
 *      404:
 *        description: The note was not found
 *      500:
 *        description: Some error happened
 */

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
