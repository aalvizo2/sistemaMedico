
import { Form, Modal, Input, Select, DatePicker } from "antd";
import { getNotes, newEditNote } from "../../../domain/entities/Notes";
import { getUsers } from "../../../domain/entities/MedicalUsers";
import { useEffect } from "react";
import moment from "moment";



const { Option } = Select;

interface NotasModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: newEditNote) => void;
  paciente: getUsers | null;
}

export const NewNoteModal: React.FC<NotasModalProps> = ({
  open,
  onClose,
  onSubmit,
  paciente,
}) => {
  const [form] = Form.useForm<newEditNote>();

  const handleFinish = (values: newEditNote) => {
    onSubmit(values);
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (paciente && open) {
      form.setFieldsValue({
        PatientId: paciente.Id,
      });
    }
  }, [paciente, open, form]);

  return (
    <Modal
      title="Nueva Nota"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        
        <Form.Item
          label="Fecha de la Nota"
          name="Date"
          rules={[
            { required: true, message: "Selecciona la fecha" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Médico / Profesional"
          name="Doctor"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el nombre del médico",
            },
          ]}
        >
          <Input placeholder="Ej. Dra. Ana Torres" />
        </Form.Item>

        <Form.Item
          label="Tipo de Nota"
          name="NoteType"
          rules={[
            {
              required: true,
              message: "Selecciona el tipo de nota",
            },
          ]}
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
          rules={[
            {
              required: true,
              message: "Por favor ingresa la descripción",
            },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Describe las observaciones médicas o indicaciones"
          />
        </Form.Item>
        <Form.Item

          name="PatientId"
        >
          <Input type="hidden" />
        </Form.Item>

      </Form>
    </Modal>
  );
};



interface EditNoteProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newData: newEditNote) => void;
  datoFila: getNotes | null;
}


export const EditNoteModal: React.FC<EditNoteProps> = ({
  open,
  onClose,
  onSubmit,
  datoFila
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (datoFila) {
      form.setFieldsValue({
        id: datoFila.id,
        PatientId: datoFila.PatientId,
        Date: moment(datoFila.Date),
        Doctor: datoFila.Doctor,
        NoteType: datoFila.NoteType,
        Description: datoFila.Description,

      });

      
    }
  }, [datoFila, form]);

  const handleSubmit = (values: newEditNote) => {
    onSubmit(values);
    onClose();
  };

  return (
    <>
      <Modal
        title="Editar Nota"
        open={open}
        onCancel={onClose}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          

          <Form.Item
            label="Fecha de la Nota"
            name="Date"
            rules={[
              { required: true, message: "Selecciona la fecha" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Médico / Profesional"
            name="Doctor"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre del médico",
              },
            ]}
          >
            <Input placeholder="Ej. Dra. Ana Torres" />
          </Form.Item>

          <Form.Item
            label="Tipo de Nota"
            name="NoteType"
            rules={[
              {
                required: true,
                message: "Selecciona el tipo de nota",
              },
            ]}
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
            rules={[
              {
                required: true,
                message: "Por favor ingresa la descripción",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Describe las observaciones médicas o indicaciones"
            />
          </Form.Item>

          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item

            name="PatientId"
          >
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Modal>

    </>
  )
}