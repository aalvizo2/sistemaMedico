import React from "react";
import { Modal, Form, Input, Col, Row, DatePicker, Upload, Typography, Divider } from "antd";
import { SaveOutlined, UploadOutlined, UserAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface AgregarModalProps {
  open: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export const AgregarModal: React.FC<AgregarModalProps> = ({ open, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  // Calcular edad al seleccionar la fecha
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
      onSubmit({ ...values });
      onCancel();
    });
  };

  return (
    <Modal
      open={open}
      title={
        <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
          <UserAddOutlined /> Agregar Paciente
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
          Por favor, completa la información del paciente. Los campos marcados con * son obligatorios.
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
              <Input placeholder="Ej. Pérez" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Apellido Materno *"
              name="MaternalSurname"
              rules={[{ required: true, message: "Por favor ingrese el apellido materno" }]}
            >
              <Input placeholder="Ej. Gómez" />
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
                placeholder="Seleccione fecha"
                style={{ width: "100%" }}
                onChange={handleBirthdayChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Edad"
              name="Age"
            >
              <Input placeholder="Edad automática" disabled style={{ background: "#f5f5f5" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Lugar de Nacimiento *"
              name="BirthPlace"
              rules={[{ required: true, message: "Por favor ingrese el lugar de nacimiento" }]}
            >
              <Input placeholder="Ej. Guadalajara, Jalisco" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Dirección *"
              name="Address"
              rules={[{ required: true, message: "Por favor ingrese la dirección" }]}
            >
              <Input placeholder="Ej. Calle Falsa 123" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Teléfono Particular"
              name="ParticularPhone"
            >
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
              <Input placeholder="Ej. Ingeniero en Sistemas" />
            </Form.Item>
          </Col>

          {/* Fotografía */}
          <Col span={12}>
            <Form.Item
              label="Fotografía"
              name="Files"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => e?.fileList}
            >
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={1}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Seleccionar imagen</div>
                </div>
              </Upload>
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
