import note from '../models/noteMode.js';


export class NoteService{
    async getAllNotes(){
        return await note.find();
    }

    async getNoteByPacientId(id){
        return await note.findById(id);
    }

    async createNote(data){
        const newData= new note(data);
        return await newNote.save();
    }

    async updateNote(id, data){
        return await note.findByIdAndUpdate(
            id, 
            data, 
            {
                new: true
            }
        )
    }

    async deleteNote(id){
        const result= await note.findByIdAndDelete(id);
        return result;
    }
};