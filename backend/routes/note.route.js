const express = require("express");
const { NoteModel } = require("../model/Note.model");
const jwt = require("jsonwebtoken");
const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const note = new NoteModel(payload);
  await note.save();
  res.send({ msg: "Note Created" });
});

noteRouter.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ msg: "Unauthorized: No token provided" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, "masai"); // Use your secret here
    const userID = decoded.userID;
    console.log(userID);
    // Find notes for this user
    const notes = await NoteModel.find({ user: userID });
    res.send(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;
  await NoteModel.findByIdAndDelete({ _id: noteID });
  res.send({ msg: `note with id ${noteID} has been  deleted` });
});
noteRouter.patch("/update/:id", async (req, res) => {
  const noteID = req.params.id;
  const payload = req.body;
  await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
  res.send({ msg: `note with id ${noteID} has been  updated` });
});

module.exports = {
  noteRouter,
};
