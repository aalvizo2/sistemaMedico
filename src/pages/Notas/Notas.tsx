import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Card,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { NotesRepositoryImpl } from "../../domain/repositories/NotesRepositoryImpl";
import { NotesUseCases } from "../../core/useCases/NotesUseCases";
import { getNotes, newEditNote } from "../../domain/entities/Notes";
import { PacientesRepositoryImpl } from "../../domain/repositories/PacientesRepositoryImpl";
import { PacientesUseCases } from "../../core/useCases/PacientesUseCases";
import { getUsers } from "../../domain/entities/MedicalUsers";

dayjs.locale("es");

const { Option } = Select;


//Importamos la API de pacientes 
const pacientesRepository = new PacientesRepositoryImpl();
const pacientesUseCases = new PacientesUseCases(pacientesRepository);

const notesRepository = new NotesRepositoryImpl();
const notesUseCases = new NotesUseCases(notesRepository);
const Notas: React.FC = () => {
  const [data, setData] = useState<getNotes[]>([]);
  const [pacientes, setPacientes] = useState<getUsers[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<newEditNote | null>(null);
  const [form] = Form.useForm();


  //Mostrar 
  const fetchData = async () => {
    try {

      const response = await notesUseCases.getNotes();
      setData(response);
      console.log('datos recuperados del backend', response)

    } catch (error) {
      console.error('Error al obtener los datos', error)
    }
  };

  //Mostramos los pacientes
  const fetchPacientes = async () => {
    try {

      const response = await pacientesUseCases.getPacientes();
      setPacientes(response);
    } catch (error) {
      console.error('Error al cargar los pacientes', error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchPacientes();
  }, []);
  const showModal = (record?: newEditNote) => {
    if (record) {
      setEditingRecord(record);
      form.setFieldsValue({
        ...record,
        Date: dayjs(record.Date),
      });
      console.log(record, 'datos que se van a grabar')
    } else {
      setEditingRecord(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedData = {
        ...values,
        Date: values.Date.format("YYYY-MM-DD"),
      };


      if (editingRecord) {
        // Editar nota existente
        console.log('datos antes de enviar', editingRecord);
        const editingValues={
           ...values,
           id: editingRecord.id
        }
        console.log('datos que se supone que tengo que enviar', editingValues)
        await notesUseCases.editNote(editingValues);
        fetchData();
      } else {
        // Agregar nueva nota
        console.log('datos antes de enviar', formattedData)
        await notesUseCases.newNote(formattedData);
        fetchData();
      }

      fetchData(); // refrescar los datos desde la API
      setIsModalVisible(false);


    } catch (error) {
      console.error("Error al guardar la nota", error);
      message.error("Ocurrió un error al guardar la nota");
    }
  };



  const handleDelete = async(id: string) => {
    try{
       await notesUseCases.deleteNote(id);
       fetchData();
    }catch(error){
      console.error("Error al eliminar la nota", error);
    }
  };

  const columns = [
    {
      title: "Paciente",
      dataIndex: "Patient",
      key: "paciente",
      align: "center" as const,
    },
    {
      title: "Fecha",
      dataIndex: "Date",
      key: "fecha",
      align: "center" as const,
      render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Médico",
      dataIndex: "Doctor",
      key: "medico",
      align: "center" as const,
    },
    {
      title: "Tipo de Nota",
      dataIndex: "NoteType",
      key: "tipoNota",
      align: "center" as const,
    },
    {
      title: "Acciones",
      key: "acciones",
      align: "center" as const,
      render: (_: any, record: newEditNote) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            type="primary"
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Eliminar esta nota médica?"
            okText="Sí"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
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
        //background: "linear-gradient(to bottom right, #fdfbfb, #ebedee)",
        minHeight: "100vh",
      }}
    >
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FileTextOutlined style={{ color: "#6366f1" }} /> Notas Médicas
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
            Nueva Nota
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
        title={editingRecord ? "Editar Nota Médica" : "Agregar Nota Médica"}
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
            <Select
              placeholder="Selecciona un paciente"
              filterOption
            >
              {pacientes.map((item) => (
                <Option
                  key={item.Id}
                  value={item.Id} 
                >
                  {item.Name} {item.PaternalSurname} {item.MaternalSurname}
                </Option>
              ))}
            </Select>

          </Form.Item>

          <Form.Item
            label="Fecha de la Nota"
            name="Date"
            rules={[{ required: true, message: "Selecciona la fecha" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Médico / Profesional"
            name="Doctor"
            rules={[{ required: true, message: "Por favor ingresa el nombre del médico" }]}
          >
            <Input placeholder="Ej. Dra. Ana Torres" />
          </Form.Item>

          <Form.Item
            label="Tipo de Nota"
            name="NoteType"
            rules={[{ required: true, message: "Selecciona el tipo de nota" }]}
          >
            <Select placeholder="Selecciona un tipo">
              <Option value="Evolución">Evolución</Option>
              <Option value="Ingreso">Ingreso</Option>
              <Option value="Alta">Alta</Option>
              <Option value="Interconsulta">Interconsulta</Option>
              <Option value="Procedimiento">Procedimiento</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Contenido / Descripción"
            name="Description"
            rules={[{ required: true, message: "Por favor ingresa la descripción" }]}
          >
            <Input.TextArea rows={4} placeholder="Describe las observaciones médicas o indicaciones" />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Notas;
