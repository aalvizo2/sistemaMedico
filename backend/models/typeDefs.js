import gpl from 'apollo-server-express';

export const gpl = `
    type Note{
      id: ID!
      Patient: String!
      PatientId: String!
      Date: String!
      Doctor: String!
      NoteType: String!
      Description: String!
    }

    input NoteInput{
      Patient: String
      PatientId: String
      Date: String
      Doctor: String
      NoteType: String
      Description: String
    }

    type Query{
     getNotes: [Note],
     getNote(id: ID!): Note
    }
    type Mutation{
      createNote(input: NoteInput!): Note
      updateNote(id: ID!, input: NoteInput!):Note
      deleteNote(id: ID!): Boolean
    }
`;