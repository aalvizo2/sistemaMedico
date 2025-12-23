import { DatePicker, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { getSeguimiento, newSeguimiento, updateSeguimiento } from "../../../domain/entities/Seguimiento";
import { getUsers } from "../../../domain/entities/MedicalUsers";
import moment from "moment";

interface NewSeguimientoModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (newData: newSeguimiento) => void;
    paciente: getUsers | null;
}

export const NewSeguimientoModal: React.FC<NewSeguimientoModalProps> = ({ open, onClose, onSave, paciente }) => {
    const [form] = Form.useForm();

    const handleSave = (newData: newSeguimiento) => {
        onSave(newData);
        onClose();
        form.resetFields();
    };

    useEffect(() => {
        if (paciente && open) {
            form.setFieldsValue({
                PatientId: paciente.Id
            })
        }
    }, [paciente, open])
    return (
        <>
            <Modal
                open={open}

                title="Agregar Seguimiento"
                onOk={() => form.submit()}
                onCancel={onClose}
                okText="Guardar"
                cancelText="Cancelar"
                className="rounded-2xl"

            >

                <Form
                    form={form}
                    onFinish={handleSave}
                    layout="vertical"
                >
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
                        <Input.TextArea rows={4} placeholder="Ej. Paracetamol 500mg cada 8h" />
                    </Form.Item>

                    <Form.Item label="Próxima Cita" name="NextAppointment">
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="Id"
                    >
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                        name="PatientId"
                    >
                        <Input type="hidden" />
                    </Form.Item>

                </Form>

            </Modal >
        </>
    )
};


interface EditSeguimientoModalProps {
    open: boolean;
    onCancel: () => void;
    onSave: (newData: updateSeguimiento) => void;
    datoFila: getSeguimiento | null;
}

export const EditSeguimientoModal: React.FC<EditSeguimientoModalProps> = ({
    open,
    onCancel,
    onSave,
    datoFila
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (datoFila && open) {
            form.setFieldsValue({
                Date: moment(datoFila.Date),
                Motivation: datoFila.Motivation,
                Observations: datoFila.Observations,
                Treathment: datoFila.Treathment,
                NextAppointment: datoFila.NextAppointment ? moment(datoFila.NextAppointment) : null,
                Id: datoFila.Id,
                PatientId: datoFila.PatientId
            });
        }
    }, [datoFila, open]);

    const handleSave = (newData: updateSeguimiento) => {
        onSave(newData);
        onCancel();
        form.resetFields();
    };
    return (
        <>
            <Modal
                open={open}
                title="Editar Seguimiento"
                onOk={() => form.submit()}
                onCancel={onCancel}
                okText="Guardar"
                cancelText="Cancelar"
                className="rounded-2xl"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}

                >


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

                    <Form.Item
                        name="PatientId"
                    >
                        <Input type="hidden" />
                    </Form.Item>


                </Form>

            </Modal>
        </>
    )
};