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
    State: boolean;
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
    CellPhone: string;
    Ocupation: string;
    State: boolean;
}

export interface activateUser{
    Id: string;
}