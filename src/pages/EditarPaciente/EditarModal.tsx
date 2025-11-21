import React, { useEffect } from "react";
import { Modal, Form, Input, Col, Row, DatePicker, Typography, Divider } from "antd";
import { SaveOutlined, UserAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface EditarModalProps {
    open: boolean;
    onSubmit: (values: any) => void;
    onCancel: () => void;
    datoFila: { [key: string]: any } | null;
}

export const EditarModal: React.FC<EditarModalProps> = ({ open, onSubmit, onCancel, datoFila }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (datoFila) {
            form.setFieldsValue({
                ...datoFila,
                Birthday: datoFila.Birthday ? dayjs(datoFila.Birthday) : null,
                Files: datoFila.Files || [],
            });
        }
    }, [datoFila, form]);

    // Calcular edad automáticamente
    const handleBirthdayChange = (date: any) => {
        if (date) {
            const today = dayjs();
            const age = today.diff(date, "year");
            form.setFieldsValue({ Age: age });
        } else {
            form.setFieldsValue({ Age: undefined });
        }
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            form.resetFields();
            onSubmit({ ...values, Id: datoFila?.Id });
            onCancel();
        });
    };

    return (
        <Modal
            open={open}
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
                    <UserAddOutlined /> Editar Paciente
                </div>
            }
            onOk={handleSubmit}
            onCancel={onCancel}
            okButtonProps={{ icon: <SaveOutlined />, type: "primary" }}
            okText="Guardar"
            cancelText="Cerrar"
            centered
            className="rounded-2xl"
            width={800}
        >
            <div style={{ padding: "8px 4px" }}>
                <Typography.Text type="secondary">
                    Modifica la información del paciente según sea necesario.
                </Typography.Text>
            </div>

            <Divider />

            <Form form={form} layout="vertical" style={{ marginTop: 10 }}>
                <Row gutter={[24, 16]}>
                    <Col span={12}>
                        <Form.Item
                            label="Nombre *"
                            name="Name"
                            rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
                        >
                            <Input placeholder="Ej. Juan" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Apellido Paterno *"
                            name="PaternalSurname"
                            rules={[{ required: true, message: "Por favor ingrese el apellido paterno" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Apellido Materno *"
                            name="MaternalSurname"
                            rules={[{ required: true, message: "Por favor ingrese el apellido materno" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Fecha de Nacimiento *"
                            name="Birthday"
                            rules={[{ required: true, message: "Por favor ingrese la fecha de nacimiento" }]}
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ width: "100%" }}
                                onChange={handleBirthdayChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Edad" name="Age">
                            <Input placeholder="Edad automática" disabled style={{ background: "#f5f5f5" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Lugar de Nacimiento *"
                            name="BirthPlace"
                            rules={[{ required: true, message: "Por favor ingrese el lugar de nacimiento" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Dirección *"
                            name="Address"
                            rules={[{ required: true, message: "Por favor ingrese la dirección" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Teléfono Particular" name="ParticularPhone">
                            <Input type="number" placeholder="Ej. 3334567890" maxLength={10} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Celular *"
                            name="CellPhone"
                            rules={[{ required: true, message: "Por favor ingrese el celular" }]}
                        >
                            <Input type="number" placeholder="Ej. 3312345678" maxLength={10} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Ocupación *"
                            name="Ocupation"
                            rules={[{ required: true, message: "Por favor ingrese la ocupación" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Fotografía */}
                    <Col span={12}>
                        <Form.Item label="Fotografía">
                            {datoFila?.Files?.length ? (
                                <img
                                    src={`http://localhost:3000/${datoFila.Files[0].Path}`}
                                    alt="Foto del paciente"
                                    style={{ width: "120px", height: "120px", objectFit: "contain", borderRadius: "8px" }}
                                />
                            ) : (
                                <div style={{ color: "#999" }}>No hay imagen</div>
                            )}
                        </Form.Item>
                    </Col>


                    {/* Campo oculto de estado */}
                    <Col>
                        <Form.Item name="State" initialValue={true}>
                            <Input type="hidden" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
