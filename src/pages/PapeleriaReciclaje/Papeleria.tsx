import{Button, Table, Tag} from 'antd';
import { useEffect, useState } from 'react';
import { getAllDeletedUsers } from '../../domain/entities/MedicalUsers';
import { PacientesRepositoryImpl } from '../../domain/repositories/PacientesRepositoryImpl';
import { PacientesUseCases } from '../../core/useCases/PacientesUseCases';
import { MdAutorenew } from 'react-icons/md';


const pacientesRepository= new PacientesRepositoryImpl();
const pacientesUseCases= new PacientesUseCases(pacientesRepository);



const Papeleria: React.FC= () => {
    const [datos, setDatos]= useState<getAllDeletedUsers[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData= async() => {
        setLoading(true);
        try{
           const response= await pacientesUseCases.getAllDeletedUsers();
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
            key: "acciones",
            render: (record: any) => (
                <div
                   style={{
                    display: "flex",
                   }}
                >
                  <Button 
                     type='default'
                     onClick={() => activar(record)}
                  >
                    <MdAutorenew />
                    Activar
                  </Button>
                </div>
            )
        }
    ];

    const activar= async(record: any) => {
        try{
            await pacientesUseCases.activateUser(record.Id);
            fetchData();
        }catch(error){
            console.log('Error al cargar los datos', error)
        }
    }
    return(
        <>
          <h1>Papeleria de Reciclaje</h1>
          <Table 
             dataSource={datos}
             columns={columns}
             loading={loading}
             scroll={{ x: "max-content" }}
        />
        </>
    )
};

export default Papeleria;