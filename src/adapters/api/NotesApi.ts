import createHttpClient from "./http/httpClient";
import { GRAPHQL_ROUTE } from "../../config/apiConfig";
import { deleteNote, getNotes, newEditNote } from "../../domain/entities/Notes";
import { message } from "antd";



const httpClient = createHttpClient(GRAPHQL_ROUTE);

export const NotesApi = {

   getNotes: async (): Promise<getNotes[]> => {
      const query = `
        query{
          getNotes{
            id
            Patient
            PatientId
            Date
            Doctor
            NoteType
            Description
          }
        }`;

      const response = await httpClient.post("", { query });
      return response.data.data.getNotes;
   },

   newNote: async (newData: newEditNote): Promise<newEditNote> => {
      const mutation = `
        mutation($input: NoteInput!) {
          createNote(input: $input) {
            
            PatientId
            Date
            Doctor
            NoteType
            Description
         }
        }
      `;
      const variables = { input: newData };
      const response = await httpClient.post("", { query: mutation, variables });
      if (response) {
         message.success('Operación realizada con éxito');
      }
      return response.data.data.createNote;

   },


   editNote: async (newData: newEditNote): Promise<newEditNote> => {
      const mutation = `
        mutation($id: ID!, $input: NoteInput!){
           updateNote(id: $id, input: $input){
              id
              PatientId
              Date
              Doctor
              NoteType
              Description
           
           }

        }
       
       `;
      const variables = {
         id: newData.id,
         input: {
            PatientId: newData.PatientId,
            Date: newData.Date,
            Doctor: newData.Doctor,
            NoteType: newData.NoteType,
            Description: newData.Description,
         }
      };

      console.log('variables antes de enviar', variables)
      const response = await httpClient.post("", { query: mutation, variables });
      return response.data.data.updateNote;
   },
   deleteNote: async (id: string): Promise<deleteNote> => {
  const mutation = `
    mutation($id: ID!) {
      deleteNote(id: $id)
    }
  `;

  const variables = { id };

  console.log('DELETE variables', variables);

  const response = await httpClient.post("", {
    query: mutation,
    variables,
  });

  if (response) {
    message.success('Nota eliminada correctamente');
  }

  return response.data.data.deleteNote;
}

};                  