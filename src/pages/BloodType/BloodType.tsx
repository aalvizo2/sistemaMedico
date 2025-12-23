import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Select,
    Space,
    Card,
    Popconfirm,

    Input,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { BloodTypeRepositoryImpl } from "../../domain/repositories/BloodTypeRepositoryImpl";
import { BloodTypeUseCases } from "../../core/useCases/BloodTypeUseCases";
import { getBloodType } from "../../domain/entities/BloodType";
import RedCrossSpinner from "../Login/Dashboard/RedCrossSpinner";

const { Option } = Select;

const bloodTypeRepository = new BloodTypeRepositoryImpl();
const bloodTypeUseCases = new BloodTypeUseCases(bloodTypeRepository);

const BloodType: React.FC = () => {
    const [data, setData] = useState<getBloodType[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        setLoading(true)
        try {
            delay(2000);
            const response = await bloodTypeUseCases.getBloodType();
            setData(response);
        } catch (error) {
            console.error("Error al cargar los datos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showModal = (record?: any) => {
        if (record) {
            setEditingRecord(record);
            form.setFieldsValue(record);
        } else {
            setEditingRecord(null);
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        form.validateFields().then(async (values) => {
            if (editingRecord) {
                setLoading(true);
                //Creamos un bloque de codigo para poder enviar los datos o si hay un error que lo lance 
                try {
                    console.log('valores antes de enviar', values);
                    
                    await bloodTypeUseCases.editBloodType(values.Id, values);
                    fetchData();
                } catch (error) {
                    console.info('Error al enviar los datos', error)
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(true)
                //Creamos un bloque de codigo para poder enviar los datos o si hay un error que lo lance 
                try {
                    await bloodTypeUseCases.newBloodType(values);
                    fetchData();
                } catch (error) {
                    console.info('Error al enviar los datos', error)
                } finally {
                    setLoading(false);
                }

            }
            setIsModalVisible(false);
        });
    };

    const handleDelete = async (id: string) => {
        setLoading(true);

        try {
            await bloodTypeUseCases.deleteBloodType(id);
            fetchData()
        } catch (error) {
            console.error('Error al eliminar el archivo');
        } finally {
            setLoading(false);
        }
    };

    const columns = [


        {
            title: "Tipo de Sangre",
            dataIndex: "BloodType",
            key: "BloodType",
            align: "center" as const,
        },
        {
            title: "Factor RH",
            dataIndex: "RHFactor",
            key: "RHFactor",
            align: "center" as const,
        },
        {
            title: "Acciones",
            key: "acciones",
            align: "center" as const,
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showModal(record)}
                        type="primary"
                    >
                        Editar
                    </Button>
                    <Popconfirm
                        title="¿Eliminar este tipo de sangre?"
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
                height: "100%",
                minHeight: "100vh",
            }}
        >
            <Card
                title={
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <HeartOutlined style={{ color: "crimson" }} /> Catálogo de Tipos de Sangre
                    </div>
                }
                style={{
                    width: "90%",
                    maxWidth: 900,
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
                        Nuevo Tipo
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    bordered
                    loading={{
                        spinning: loading,
                        indicator: <RedCrossSpinner />
                    }}
                />
            </Card>

            <Modal
                title={editingRecord ? "Editar Tipo de Sangre" : "Agregar Tipo de Sangre"}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                okText="Guardar"
                cancelText="Cancelar"
                centered
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tipo de Sangre"
                        name="BloodType"
                        rules={[{ required: true, message: "Por favor ingresa el tipo de sangre" }]}
                    >
                        <Input placeholder="Tipo de Sangre" />
                    </Form.Item>

                    <Form.Item
                        label="Factor RH"
                        name="RHFactor"
                        rules={[{ required: false, message: "Por favor selecciona el factor RH" }]}
                    >
                        <Select placeholder="Selecciona el factor RH">
                            <Option value="Positivo">+</Option>
                            <Option value="Negativo">-</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="Id" hidden>
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </motion.div>
    );
};

export default BloodType;
