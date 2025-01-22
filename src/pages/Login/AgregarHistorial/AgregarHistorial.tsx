
import { Table, Tag, Button } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import { useState } from 'react';
import { AgregarModal } from './AgregarModal';



const AgregarHistorial = () => {
    const [modal, setModal]= useState(false);
    const [datos, setDatos]= useState([
        {
            Name: "Alan",
            PaternalSurname: "Alvizo",
            MaternalSurname: "Alvizo",
            Birthday: "1999-09-09",
            Age: 22,
            BirthPlace: "Mexico",
            Address: "Calle 123",
            ParticularPhone: "1234567890",
            CellPhone: "1234567890",
            Ocupation: "Estudiante",
            State: true
        },
        {
            Name: "Carlos",
            PaternalSurname: "Hernandez",
            MaternalSurname: "Gomez",
            Birthday: "1995-08-25",
            Age: 30,
            BirthPlace: "Monterrey",
            Address: "Calle Ficticia 456",
            ParticularPhone: "4567890123",
            CellPhone: "6543210987",
            Ocupation: "Ingeniero",
            State: false
        },
        {
            Name: "Lucia",
            PaternalSurname: "Ramirez",
            MaternalSurname: "Perez",
            Birthday: "1990-12-05",
            Age: 34,
            BirthPlace: "Tijuana",
            Address: "Blvd. 2000 #300",
            ParticularPhone: "5678901234",
            CellPhone: "7654321098",
            Ocupation: "Doctora",
            State: true
        },
        {
            Name: "Juan",
            PaternalSurname: "Garcia",
            MaternalSurname: "Sanchez",
            Birthday: "1988-02-20",
            Age: 37,
            BirthPlace: "Culiacán",
            Address: "Calle 25 #50",
            ParticularPhone: "6789012345",
            CellPhone: "8765432109",
            Ocupation: "Profesor",
            State: false
        },
        {
            Name: "Ana",
            PaternalSurname: "Martinez",
            MaternalSurname: "Lopez",
            Birthday: "2000-11-11",
            Age: 24,
            BirthPlace: "Puebla",
            Address: "Calle Reforma 789",
            ParticularPhone: "7890123456",
            CellPhone: "9876543210",
            Ocupation: "Diseñadora",
            State: true
        }
    ]);

    const columns= [
        {title: "Nombre", dataIndex: "Name", key: "Name"},
        {title: "Apellido Paterno", dataIndex: "PaternalSurname", key: "PaternalSurname"},
        {title: "Apellido Materno", dataIndex: "MaternalSurname", key: "MaternalSurname"},
        {title: "Fecha de Nacimiento", dataIndex: "Birthday", key: "Birthday"},
        {title: "Edad", dataIndex: "Age", key: "Age"},
        {title: "Lugar de Nacimiento", dataIndex: "BirthPlace", key: "BirthPlace"},
        {title: "Dirección", dataIndex: "Address", key: "Address"},
        {title: "Teléfono Particular", dataIndex: "ParticularPhone", key: "ParticularPhone"},
        {title: "Celular", dataIndex: "CellPhone", key: "CellPhone"},
        {title: "Ocupación", dataIndex: "Ocupation", key: "Ocupation"},
        {
            title: "Estatus",
            key: "estatus",
            dataIndex: "State",
            render: (estatus: any) => (
                <Tag color={estatus ? "green" : "red"} >
                    {estatus ? "Activo" : "Inactivo"}
                </Tag>
            )
        }
    ];

    //Creamos la funcion para abrir el modal y guardar datos
    const handleOpenModal= () => {
        setModal(true);
    };
    const handleCloseModal= () => {
        setModal(false)
    };

    const handleAdd= (newData: string)=> {
        //@ts-expect-error
         setDatos([...datos, newData]);
    }
    return (
        <div>
            <h1>Agregar Paciente</h1>
             <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px"
                }}
             >
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleOpenModal}
                >
                    Agregar Nuevo
                </Button>
             </div>
            <Table dataSource={datos} columns={columns} className='table-responsive'/>
            <AgregarModal
               open={modal}
               onCancel={handleCloseModal}
               onSubmit={handleAdd}
            />
        </div>
    )
}
export default AgregarHistorial;