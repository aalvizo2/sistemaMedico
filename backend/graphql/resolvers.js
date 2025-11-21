import Note from "../models/noteMode.js";

export const resolvers = {
    Query: {
    getNotes: async () => {
      return await Note.find();
    },
    getNote: async (_, { id }) => {
      return await Note.findById(id);
    },
  },
  Mutation: {
    createNote: async (_, { input }) => {
      const newNote = new Note(input);
      return await newNote.save();
    },
    updateNote: async (_, { id, input }) => {
      return await Note.findByIdAndUpdate(id, input, { new: true });
    },
    deleteNote: async (_, { id }) => {
      const deleted = await Note.findByIdAndDelete(id);
      return deleted ? true : false;
    },
  },
};
