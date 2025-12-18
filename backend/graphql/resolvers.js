import Note from "../models/noteMode.js";
import userModel from "../models/userModel.js";

export const resolvers = {
  Query: {
    getNotes: async () => {
      return await Note.find();
    },
    getNote: async (_, { id }) => {
      return await Note.findById(id);
    },
    getNotesByPatient: async (_, { patientId }) => {
      return await Note.find({ PatientId: patientId });
    },

  },
  Mutation: {
    createNote: async (_, { input }) => {
      const usuario = await userModel.findById(input.PatientId);
      console.log('usuario encontrado', usuario)
      if (!usuario) {
        throw new Error("Paciente no encontrado");
      }

      const newNote = new Note({
        ...input,
        Patient: `${usuario.Name} ${usuario.PaternalSurname} ${usuario.MaternalSurname}`,
        PatientId: usuario._id
      });

      console.log('datos antes de guardar', newNote)

      return await newNote.save();
    },
    updateNote: async (_, { id, input }) => {
      const usuario = await userModel.findById(input.PatientId);
      if (!usuario) {
        throw new Error("Paciente no encontrado");
      }

      const newData = {
        ...input,
        Date: typeof input.Date === "string"
          ? input.Date
          : new Date(input.Date).toISOString(), // 👈 CLAVE
        Patient: `${usuario.Name} ${usuario.PaternalSurname} ${usuario.MaternalSurname}`,
        PatientId: usuario._id
      };

      return await Note.findByIdAndUpdate(id, newData, { new: true });
    },


    deleteNote: async (_, { id }) => {
      const deleted = await Note.findByIdAndDelete(id);
      return deleted ? true : false;
    },
  },
};
