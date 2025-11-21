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
  message,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { PacientesRepositoryImpl } from "../../domain/repositories/PacientesRepositoryImpl";
import { PacientesUseCases } from "../../core/useCases/PacientesUseCases";
import { certainUsers } from "../../domain/entities/MedicalUsers";


//Cargamos los datos de los usuarios con graphQL
const pacienteRepository= new PacientesRepositoryImpl();
const pacienteUseCases= new PacientesUseCases(pacienteRepository);


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
  const [data, setData] = useState<Seguimiento[]>([
    {
      id: "1",
      paciente: "Juan Pérez",
      fecha: "2025-10-20",
      motivo: "Dolor de cabeza",
      observaciones: "Se recetó paracetamol y descanso.",
      tratamiento: "Paracetamol 500mg cada 8h.",
      proximaCita: "2025-11-01",
    },
    {
      id: "2",
      paciente: "María López",
      fecha: "2025-10-22",
      motivo: "Revisión postoperatoria",
      observaciones: "Buena cicatrización. Sin complicaciones.",
      tratamiento: "Continuar con antibióticos 3 días más.",
      proximaCita: "2025-10-29",
    },
  ]);
  const [pacientes, setPacientes]= useState<certainUsers[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Seguimiento | null>(null);
  const [form] = Form.useForm();


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
  }, []);

  const showModal = (record?: Seguimiento) => {
    if (record) {
      setEditingRecord(record);
      form.setFieldsValue({
        ...record,
        fecha: dayjs(record.fecha),
        proximaCita: record.proximaCita ? dayjs(record.proximaCita) : undefined,
      });
    } else {
      setEditingRecord(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newData = {
        ...values,
        fecha: values.fecha.format("YYYY-MM-DD"),
        proximaCita: values.proximaCita
          ? values.proximaCita.format("YYYY-MM-DD")
          : undefined,
      };

      if (editingRecord) {
        setData((prev) =>
          prev.map((item) =>
            item.id === editingRecord.id ? { ...item, ...newData } : item
          )
        );
        message.success("Seguimiento actualizado correctamente");
      } else {
        setData((prev) => [...prev, { id: Date.now().toString(), ...newData }]);
        message.success("Seguimiento agregado correctamente");
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success("Seguimiento eliminado");
  };

  const columns = [
    {
      title: "Paciente",
      dataIndex: "paciente",
      key: "paciente",
      align: "center" as const,
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      align: "center" as const,
      render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Motivo",
      dataIndex: "motivo",
      key: "motivo",
      align: "center" as const,
    },
    {
      title: "Próxima Cita",
      dataIndex: "proximaCita",
      key: "proximaCita",
      align: "center" as const,
      render: (text?: string) =>
        text ? dayjs(text).format("DD/MM/YYYY") : "—",
    },
    {
      title: "Acciones",
      key: "acciones",
      align: "center" as const,
      render: (_: any, record: Seguimiento) => (
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
            name="paciente"
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
            name="fecha"
            rules={[{ required: true, message: "Selecciona la fecha del seguimiento" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Motivo o Síntoma"
            name="motivo"
            rules={[{ required: true, message: "Describe el motivo de la consulta" }]}
          >
            <Input placeholder="Ej. Dolor de cabeza" />
          </Form.Item>

          <Form.Item label="Observaciones / Evolución" name="observaciones">
            <Input.TextArea rows={3} placeholder="Anota observaciones médicas" />
          </Form.Item>

          <Form.Item label="Tratamiento / Recomendaciones" name="tratamiento">
            <Input.TextArea rows={2} placeholder="Ej. Paracetamol 500mg cada 8h" />
          </Form.Item>

          <Form.Item label="Próxima Cita" name="proximaCita">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Seguimiento;
