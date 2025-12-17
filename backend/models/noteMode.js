import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  Patient: {
    type: String,
    required: true
  },
  PatientId: {
    type: String,
    required: true
  },
  Date: {
    type: String,
    required: true
  },
  Doctor: {
    type: String,
    required: false
  },
  NoteType: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
});

// Nombre del modelo en mayúscula "Note" (convención)
const Note = mongoose.model("Note", noteSchema);

export default Note;
