// models/Note.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  content: String,
  completed: Boolean,
  timestamp: String,
});

export default mongoose.model('Note', noteSchema);
