import {makeExecutableSchema} from 'graphql-tools';
import { resolvers } from './resolvers.js';

export const typeDefs= `
   type Note {
    id: ID!
    Patient: String!
    PatientId: String!
    Date: String!
    Doctor: String
    NoteType: String!
    Description: String!
  }

  input NoteInput {
    PatientId: String!
    Date: String!
    Doctor: String
    NoteType: String!
    Description: String!
  }

  type Query {
    getNotes: [Note!]!
    getNote(id: ID!): Note
  }

  type Mutation {
    createNote(input: NoteInput!): Note!
    updateNote(id: ID!, input: NoteInput!): Note!
    deleteNote(id: ID!): Boolean!
  }
`;


export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})