export interface getSeguimiento{
    PatientId: string;
    Date: string;
    Motivation: string;
    Observations: string;
    Treathment: string;
    NextAppointment: string;
    Status: boolean;
    Id: string;
}

export interface newSeguimiento{
    PatientId: string;
    Date: string;
    Motivation: string;
    Observations: string;
    Treathment: string;
    NextAppointment: string;
}

export interface updateSeguimiento{
    Id: string;
    PatientId: string;
    Date: string;
    Motivation: string;
    Observations: string;
    Treathment: string;
    NextAppointment: string;
}


export interface deleteSeguimiento{
    Id: string;
}

export interface activateSeguimiento{
    Id: string;
}

