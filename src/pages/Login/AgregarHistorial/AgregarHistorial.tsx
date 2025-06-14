
import { Table, Tag, Button } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { AgregarModal } from './AgregarModal';
import { PacientesRepositoryImpl } from '../../../domain/repositories/PacientesRepositoryImpl';
import { PacientesUseCases } from '../../../core/useCases/PacientesUseCases';
import { newPaciente } from '../../../domain/entities/MedicalUsers';
import RedCrossSpinner from '../Dashboard/RedCrossSpinner';
import { usePacienteContext } from '../../../context/DashboardContext';

const pacientesRepository = new PacientesRepositoryImpl();
const pacientesUseCases = new PacientesUseCases(pacientesRepository);

const AgregarHistorial = () => {
    const [modal, setModal] = useState(false);
    //const [datos, setDatos] = useState<getUsers[]>([]);
    const {pacientes, refreshPacientes, loading}= usePacienteContext();
    //const [loading, setLoading] = useState(false);



    // const fetchData = async () => {
    //     setLoading(true);
    //     const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    //     try {
    //         await delay(1000)
    //         const response = await pacientesUseCases.getPacientes();
    //         setDatos(response);
    //     } catch (error) {
    //         console.error("Error al cargar los datos", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        refreshPacientes();
    }, []);


    const columns = [
        { title: "Nombre", dataIndex: "Name", key: "Name" },
        { title: "Apellido Paterno", dataIndex: "PaternalSurname", key: "PaternalSurname" },
        { title: "Apellido Materno", dataIndex: "MaternalSurname", key: "MaternalSurname" },
        { title: "Fecha de Nacimiento", dataIndex: "Birthday", key: "Birthday" },
        { title: "Edad", dataIndex: "Age", key: "Age" },
        { title: "Lugar de Nacimiento", dataIndex: "BirthPlace", key: "BirthPlace" },
        { title: "Dirección", dataIndex: "Address", key: "Address" },
        { title: "Teléfono Particular", dataIndex: "ParticularPhone", key: "ParticularPhone" },
        { title: "Celular", dataIndex: "CellPhone", key: "CellPhone" },
        { title: "Ocupación", dataIndex: "Ocupation", key: "Ocupation" },
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
    const handleOpenModal = () => {
        setModal(true);
    };
    const handleCloseModal = () => {
        setModal(false)
    };

    const handleAdd = async (newData: newPaciente) => {
        //setLoading(true);
        try {
            await pacientesUseCases.newPaciente(newData);
            refreshPacientes();

        } catch (error) {
            console.error("Error al agregar", error);
        }

    };
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
            <div style={{ minHeight: 300, position: 'relative' }}>
               <Table
                //@ts-expect-error
                dataSource={pacientes}
                columns={columns}
                className='table-responsive'
                loading={{
                    spinning: loading,
                    indicator: <RedCrossSpinner />
                }}
                scroll={{ x: "max-content" }}
                locale={{
                    emptyText: loading ? '' : 'No hay datos'
                }}
            />
            </div>
            
            <AgregarModal
                open={modal}
                onCancel={handleCloseModal}
                onSubmit={handleAdd}
            />
        </div>
    )
}
export default AgregarHistorial;