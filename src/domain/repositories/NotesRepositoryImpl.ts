import { NotesApi } from "../../adapters/api/NotesApi";
import { deleteNote, getNotes, newEditNote } from "../entities/Notes";



export class NotesRepositoryImpl{
    async getNotes():Promise<getNotes[]>{
        return NotesApi.getNotes();
    }

    async newNote(newData: newEditNote): Promise<newEditNote>{
        return NotesApi.newNote(newData);
    }

    async editNote(newData: newEditNote): Promise<newEditNote>{
        return NotesApi.editNote(newData);
    }

    async deleteNote(id: string): Promise<deleteNote>{
        return NotesApi.deleteNote(id);
    }
}