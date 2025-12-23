export interface getUsers{
    Id: string;
    Name: string;
    PaternalSurname: string;
    MaternalSurname: string;
    Birthday: string;
    Age: string;
    BirthPlace: string;
    Address: string;
    ParticularPhone: string;
    CellPhone: string;
    Ocupation: string;
    BloodType: string;
    RHFactor: string;
    State: boolean;
    Files?: {
        Path: string;
        Extension: string;
    }
}

export interface newPaciente{
    Name: string;
    PaternalSurname: string;
    MaternalSurname: string;
    Birthday: string;
    Age: string;
    BirthPlace: string;
    Address: string;
    ParticularPhone: string;
    CellPhone: string;
    Ocupation: string;
    BloodType: string;
    RHFactor: string;
    Files?: {
        file: {
            originFileObj: File;
        };
    };
    
}


export interface editPaciente{
    Id: string;
    PaternalSurname: string;
    MaternalSurname: string;
    Birthday: string;
    Age: string;
    BirthPlace: string;
    Address: string;
    ParticularPhone: string;
    BloodType: string;
    RHFactor: string;
    CellPhone: string;
    Ocupation: string;
}

export interface deletePaciente{
    Id: string;
}


export interface getAllDeletedUsers{
    Name: string;
    PaternalSurname: string;
    MaternalSurname: string;
    Birthday: string;
    Age: string;
    BirthPlace: string;
    Address: string;
    ParticularPhone: string;
    BloodType: string;
    RHFactor: string;
    CellPhone: string;
    Ocupation: string;
    State: boolean;
}

export interface activateUser{
    Id: string;
}

export interface certainUsers{
    Id: string;
    Name: string;
    PaternalSurname: string;
    MaternalSurname: string;
}