import React, { useState } from "react";
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

dayjs.locale("es");

const { Option } = Select;

interface NotaMedica {
  id: string;
  paciente: string;
  fecha: string;
  medico: string;
  tipoNota: string;
  descripcion: string;
}

const Notas: React.FC = () => {
  const [data, setData] = useState<NotaMedica[]>([
    {
      id: "1",
      paciente: "Juan Pérez",
      fecha: "2025-10-20",
      medico: "Dra. María Gómez",
      tipoNota: "Evolución",
      descripcion: "Paciente presenta mejoría, sin fiebre. Se mantiene tratamiento actual.",
    },
    {
      id: "2",
      paciente: "Ana Rodríguez",
      fecha: "2025-10-25",
      medico: "Dr. Luis Herrera",
      tipoNota: "Ingreso",
      descripcion: "Ingreso por dolor abdominal. Se ordenan análisis de laboratorio.",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<NotaMedica | null>(null);
  const [form] = Form.useForm();

  const showModal = (record?: NotaMedica) => {
    if (record) {
      setEditingRecord(record);
      form.setFieldsValue({
        ...record,
        fecha: dayjs(record.fecha),
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
      };

      if (editingRecord) {
        setData((prev) =>
          prev.map((item) =>
            item.id === editingRecord.id ? { ...item, ...newData } : item
          )
        );
        message.success("Nota médica actualizada correctamente");
      } else {
        setData((prev) => [...prev, { id: Date.now().toString(), ...newData }]);
        message.success("Nota médica agregada correctamente");
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success("Nota médica eliminada");
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
      title: "Médico",
      dataIndex: "medico",
      key: "medico",
      align: "center" as const,
    },
    {
      title: "Tipo de Nota",
      dataIndex: "tipoNota",
      key: "tipoNota",
      align: "center" as const,
    },
    {
      title: "Acciones",
      key: "acciones",
      align: "center" as const,
      render: (_: any, record: NotaMedica) => (
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
            name="paciente"
            rules={[{ required: true, message: "Por favor ingresa el nombre del paciente" }]}
          >
            <Input placeholder="Ej. Juan Pérez" />
          </Form.Item>

          <Form.Item
            label="Fecha de la Nota"
            name="fecha"
            rules={[{ required: true, message: "Selecciona la fecha" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Médico / Profesional"
            name="medico"
            rules={[{ required: true, message: "Por favor ingresa el nombre del médico" }]}
          >
            <Input placeholder="Ej. Dra. Ana Torres" />
          </Form.Item>

          <Form.Item
            label="Tipo de Nota"
            name="tipoNota"
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
            name="descripcion"
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
