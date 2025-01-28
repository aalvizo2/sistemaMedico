
import { Table, Tag, Button, Popconfirm } from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import { useEffect, useState } from 'react';
import {EditarModal} from './EditarModal'

import { PacientesRepositoryImpl } from '../../domain/repositories/PacientesRepositoryImpl';
import { PacientesUseCases } from '../../core/useCases/PacientesUseCases';
import { editPaciente, getUsers} from '../../domain/entities/MedicalUsers';
import './Editar.css'

const pacientesRepository= new PacientesRepositoryImpl();
const pacientesUseCases= new PacientesUseCases(pacientesRepository);

const EditarPaciente = () => {
    const [modal, setModal]= useState(false);
    const [datos, setDatos]= useState<getUsers[]>([]);
    const [loading, setLoading] = useState(false);
    const [datoFila, setDatoFila] = useState<string[] | null>(null);



    const fetchData= async() => {
        setLoading(true);
        try{
            const response= await pacientesUseCases.getPacientes();
            setDatos(response);
        }catch(error){
            console.error("Error al cargar los datos", error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    

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
        },
        {
            title: "Acciones",
            render: (record: any) => (
                <div className="button">
                     <Button type='default' onClick={()=> handleOpenModal(record)}>
                         <EditOutlined /> Editar
                      </Button>
                      <Popconfirm
                         title="¿Estás segúro de desactivar este registro?"
                         okText="Sí"
                         cancelText="No"
                         onConfirm={() => handleDelete(record)}
                      >
                         <Button type='default' >
                           <DeleteOutlined /> Desactivar
                         </Button>
                      </Popconfirm>
                      
                </div>
                
            )
        }
    ];

    //Creamos la funcion para abrir el modal y guardar datos
    const handleOpenModal= (record: any) => {
        setDatoFila(record);
        setModal(true);
    };
    const handleCloseModal= () => {
        setModal(false)
    };

    const handleAdd= async(newData: editPaciente)=> {
    setLoading(true);
        try{
          const Id= newData.Id;
          await pacientesUseCases.editPaciente(Id, newData);
          fetchData();

        }catch(error){
           console.error("Error al agregar", error);
        }
        
    };
    const handleDelete= async(record: any) => {
        await pacientesUseCases.deletePaciente(record.Id);
        fetchData();
    }
    return (
        <div>
            <h1>Editar Paciente</h1>
             <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px"
                }}
             >
                
             </div>
            <Table 
                dataSource={datos} 
                columns={columns} 
                loading={loading}
                scroll={{ x: "max-content" }}
            />
            <EditarModal
               open={modal}
               onCancel={handleCloseModal}
               onSubmit={handleAdd}
               datoFila={datoFila}
            />
        </div>
    )
}
export default EditarPaciente;