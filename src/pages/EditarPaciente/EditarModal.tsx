import React, { useEffect } from "react";
import {Modal,  Form, Input, Col, Row, DatePicker} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import moment from "moment";

interface EditarModalProps {
    open: boolean;
    onSubmit: (values: any) => void;
    onCancel: () => void;
    datoFila: { [key: string]: any } | null;
}
export const EditarModal: React.FC<EditarModalProps>= ({open, onSubmit, onCancel, datoFila}) => {
    const [form]= Form.useForm();

    useEffect(() => {
        if (datoFila) {
            form.setFieldsValue({
                ...datoFila,
                Birthday: datoFila.Birthday ? moment(datoFila.Birthday) : null,
            });
            console.log(datoFila)
        }
    }, [datoFila, form, open]);
    

    const handleSubmit = () => {
        form.validateFields().then(values => {
            form.resetFields();
            onSubmit({
                ...values,
                Id: datoFila?.Id
            });
            onCancel();
        });
    };

    return(
        <Modal
           open={open}
           title="Agregar Paciente"
           onOk={handleSubmit}
           onCancel={onCancel}
           okButtonProps={{ icon: <SaveOutlined />, type: "primary" }}
           okText="Guardar"
           cancelText="Cerrar"
       > 
                      <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Nombre"
                            name="Name"
                            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Apellido Paterno"
                            name="PaternalSurname"
                            rules={[{ required: true, message: 'Por favor ingrese el apellido paterno' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Apellido Materno"
                            name="MaternalSurname"
                            rules={[{ required: true, message: 'Por favor ingrese el apellido materno' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Fecha de Nacimiento"
                            name="Birthday"
                            rules={[{ required: true, message: 'Por favor ingrese la fecha de nacimiento' }]}
                        >
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Edad"
                            name="Age"
                            rules={[{ required: true, message: 'Por favor ingrese la edad' }]}
                        >
                            <Input type="number" maxLength={5}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Lugar de Nacimiento"
                            name="BirthPlace"
                            rules={[{ required: true, message: 'Por favor ingrese el lugar de nacimiento' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Dirección"
                            name="Address"
                            rules={[{ required: true, message: 'Por favor ingrese la dirección' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Teléfono Particular"
                            name="ParticularPhone"
                            rules={[{ required: true, message: 'Por favor ingrese el teléfono particular' }]}
                        >
                            <Input type="number" maxLength={10}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Celular"
                            name="CellPhone"
                            rules={[{ required: true, message: 'Por favor ingrese el celular' }]}
                        >
                            <Input type="number" maxLength={10}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Ocupación"
                            name="Ocupation"
                            rules={[{ required: true, message: 'Por favor ingrese la ocupación' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item name="State" initialValue={true}>
                        <Input type="hidden" />
                      </Form.Item>
                    </Col>
                </Row>

            </Form>
  

        </Modal>
    )
}