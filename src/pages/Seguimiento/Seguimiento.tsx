import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  Card,
  Popconfirm,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { PacientesRepositoryImpl } from "../../domain/repositories/PacientesRepositoryImpl";
import { PacientesUseCases } from "../../core/useCases/PacientesUseCases";
import { certainUsers } from "../../domain/entities/MedicalUsers";
import { SeguimientoRepositoryImpl } from "../../domain/repositories/SeguimientoRepositoryImpl";
import { SeguimientoUseCases } from "../../core/useCases/SeguimientoUseCases";
import { getSeguimiento, updateSeguimiento } from "../../domain/entities/Seguimiento";


//Cargamos los datos de los usuarios con graphQL
const pacienteRepository= new PacientesRepositoryImpl();
const pacienteUseCases= new PacientesUseCases(pacienteRepository);


//Importamos las funciones necesarias para consumir 
const seguimientoRepository= new SeguimientoRepositoryImpl();
const seguimientoUseCases= new SeguimientoUseCases(seguimientoRepository)


const {Option}= Select;
dayjs.locale("es");

interface Seguimiento {
  id: string;
  paciente: string;
  fecha: string;
  motivo: string;
  observaciones: string;
  tratamiento: string;
  proximaCita?: string;
  
}

const Seguimiento: React.FC = () => {
  const [data, setData] = useState<getSeguimiento[]>([]);
  const [pacientes, setPacientes]= useState<certainUsers[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<updateSeguimiento | null>(null);
  const [form] = Form.useForm();

  //Cargamos todos los datos del catalogo
  const fetchData= async() => {
    try{
      const response= await seguimientoUseCases.getSeguimiento();
      setData(response);
      console.log('datos de la api', response)

    }catch(error){
       console.error('Error al obtener los datos', error);
    }
  }
  //Cargamos los datos de los pacientes
  const fetchPatient= async() => {
     try{
      const response= await pacienteUseCases.getPacientes();
      setPacientes(response);
       
     }catch(error){
       console.error('Error al cargar los pacientes', error)
     }
  };

  useEffect(() => {
    fetchPatient();
    fetchData();
  }, []);

  const showModal = (record?: updateSeguimiento) => {
    console.log('record para editar', record);
    if (record) {
      setEditingRecord(record);
      form.setFieldsValue({
        ...record,
        Date: dayjs(record.Date),
        NextAppointment: record.NextAppointment ? dayjs(record.NextAppointment) : undefined,
        
      });
    } else {
      setEditingRecord(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

 const handleOk = async () => {
  try {
    const values = await form.validateFields();

    const newData = {
      ...values,
      Date: values.Date.format("YYYY-MM-DD"),
      NextAppointment: values.NextAppointment
        ? values.Date.format("YYYY-MM-DD")
        : undefined,
      Id: values.Id
    };

    if (editingRecord) {
      console.log('valores antes de enviar', newData)
      await seguimientoUseCases.updateSeguimiento(newData);
      fetchData();
    } else {
      await seguimientoUseCases.newSeguimiento(newData);
      fetchData();
    }

    setIsModalVisible(false);
  } catch (error) {
    console.error(error);
    // aquí puedes meter message.error() si usas antd
  }
};


  const handleDelete = async(Id: string) => {
    try{
      await seguimientoUseCases.deleteSeguimiento(Id);
      fetchData();
    }catch(error){
      console.error('Error al eliminar el seguimiento', error);
    }
  };

  const columns = [
    {
      title: "Paciente",
      dataIndex: "Patient",
      key: "PatientId",
      align: "center" as const,
    },
    {
      title: "Fecha",
      dataIndex: "Date",
      key: "Date",
      align: "center" as const,
      render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Motivo",
      dataIndex: "Motivation",
      key: "Motivation",
      align: "center" as const,
    },
    {
      title: "Próxima Cita",
      dataIndex: "NextAppointment",
      key: "NextAppointment",
      align: "center" as const,
      render: (text?: string) =>
        text ? dayjs(text).format("DD/MM/YYYY") : "—",
    },
    {
      title: "Acciones",
      key: "acciones",
      align: "center" as const,
      render: (_: any, record: updateSeguimiento) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            type="primary"
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Eliminar este seguimiento?"
            okText="Sí"
            cancelText="No"
            onConfirm={() => handleDelete(record.Id)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        //background: "linear-gradient(to bottom right, #f7fafc, #e3eefc)",
        minHeight: "100vh",
      }}
    >
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FileSearchOutlined style={{ color: "#3b82f6" }} /> Seguimiento Médico
          </div>
        }
        style={{
          width: "90%",
          maxWidth: 1100,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: 16,
          background: "#fff",
        }}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            style={{ borderRadius: 8 }}
          >
            Nuevo Seguimiento
          </Button>
        }
      >
        <Table
          columns={columns}
          
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>

      <Modal
        title={editingRecord ? "Editar Seguimiento" : "Agregar Seguimiento"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Guardar"
        cancelText="Cancelar"
        centered
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Paciente"
            name="PatientId"
            rules={[{ required: true, message: "Por favor ingresa el nombre del paciente" }]}
          >
            <Select>
               {pacientes.map((item) => (
                 <Option 
                    key={item.Id}
                    value={item.Id}
                 >
                   {item.Name} {item.MaternalSurname} {item.PaternalSurname}
                 </Option>
               ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Fecha del Seguimiento"
            name="Date"
            rules={[{ required: true, message: "Selecciona la fecha del seguimiento" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Motivo o Síntoma"
            name="Motivation"
            rules={[{ required: true, message: "Describe el motivo de la consulta" }]}
          >
            <Input placeholder="Ej. Dolor de cabeza" />
          </Form.Item>

          <Form.Item label="Observaciones / Evolución" name="Observations">
            <Input.TextArea rows={3} placeholder="Anota observaciones médicas" />
          </Form.Item>

          <Form.Item label="Tratamiento / Recomendaciones" name="Treathment">
            <Input.TextArea rows={2} placeholder="Ej. Paracetamol 500mg cada 8h" />
          </Form.Item>

          <Form.Item label="Próxima Cita" name="NextAppointment">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="Id"
          >
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Seguimiento;
