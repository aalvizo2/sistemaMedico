export interface getNotes{
    id: string;
    Patient: string;
    PatientId: string;
    Date: string;
    Doctor: string;
    NoteType: string;
    Description: string;

}

export interface newEditNote{
    id: string;
    Patient: string;
    Date: string;
    Doctor: string;
    NoteType: string;
    Description: string;
    PatientId: string;
}


export interface deleteNote{
    id: string;
}