// routes/notes.js
import express from "express";
import Note from "../models/note.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all notes for a user
router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
});

// CREATE a new note
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const newNote = await Note.create({
    userId: req.user.id,
    title,
    content,
    completed: false,
    timestamp: new Date().toLocaleString(),
  });
  res.status(201).json(newNote);
});

// UPDATE a note
router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE a note
router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Note deleted" });
});

export default router;
