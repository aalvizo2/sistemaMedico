import { deleteNote, getNotes, newEditNote } from "../../domain/entities/Notes";
import { NotesRepositoryImpl } from "../../domain/repositories/NotesRepositoryImpl";




export class NotesUseCases{
    constructor(private notesRepository: NotesRepositoryImpl){}

    async getNotes(): Promise<getNotes[]>{
        return this.notesRepository.getNotes();
    }

    async newNote(newData: newEditNote): Promise<newEditNote>{
        return this.notesRepository.newNote(newData);
    }

    async editNote(newData: newEditNote): Promise<newEditNote>{
        return this.notesRepository.editNote(newData)
    }

    async deleteNote(id: string): Promise<deleteNote>{
        return this.notesRepository.deleteNote(id);
    }
}