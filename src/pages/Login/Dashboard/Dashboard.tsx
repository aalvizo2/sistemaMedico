import React from 'react';
import './Dashboard.css';
import image from '../../../../public/images/image.webp';
import { Select } from 'antd';

import { usePacienteContext } from '../../../context/DashboardContext';
import moment from 'moment';
import { HistorialClinicoUseCases } from '../../../core/useCases/HistorialClinicoUseCases';
import { HistorialMedicoRepositoryImpl } from '../../../domain/repositories/HistorialClinicoRepositoryImpl';
//import MultiCircleSpinner from './MultiCircleSpinner';
import RedCrossSpinner from './RedCrossSpinner';




const historialRepository = new HistorialMedicoRepositoryImpl();
const historialUseCases = new HistorialClinicoUseCases(historialRepository);


const { Option } = Select;
const Dashboard: React.FC = () => {

  const { paciente, loading, setLoading } = usePacienteContext();

  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Dividir en partes
    return match ? `${match[1]}-${match[2]}-${match[3]}` : phone; // Formatear
  };

  const fetchHistorial = async (userId: string) => {
    setLoading(true);

    // función delay con promesa
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      await delay(3000); // espera 3 segundos

      const response = await historialUseCases.getHistorial(userId);
      console.log(response);

    } catch (error) {
      console.error('Error al cargar los datos', error);
    } finally {
      setLoading(false);
    }
  };



  console.log(paciente, "paciente recuperado")
  return (
    <>

      <div className="encabezado"></div>
      {loading ? (
        <div></div>
      ) : paciente ? (
        <h1>Datos del Paciente</h1>
      ) : (
        <div></div>
      )}



      <div className="contenedor-general">

        <div className="contenedor" style={{ position: 'relative', minHeight: '300px' }}>
          {loading ? (
            <div
              className="loading-container"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 10,
                transform: 'traslate(-50%, -50%)'
              }}
            >
              <RedCrossSpinner />
            </div>
          ) : paciente ? (
            <>
              <div className="form-container">
                <div className="column">
                  <span>Nombre(s):</span> {paciente.Name}
                </div>
                <div className="column">
                  <span>Apellido Paterno: </span> {paciente.PaternalSurname}
                </div>
                <div className="column">
                  <span>Apellido Materno: </span> {paciente.MaternalSurname}
                </div>
              </div>

              <div className="form-container">
                <div className="column">
                  <span>Fecha de Nacimiento:</span>{" "}
                  {moment(paciente.Birthday).format("DD/MM/YYYY")}
                </div>
                <div className="column">
                  <span>Edad: </span> {paciente.Age}
                </div>
                <div className="column">
                  <span>Lugar de Nacimiento: </span> {paciente.BirthPlace}
                </div>
              </div>

              <div className="form-container">
                <div className="column">
                  <span>Domicilio: </span> {paciente.Address}
                </div>
                <div className="column">
                  <span>Teléfono:</span> {formatPhoneNumber(paciente.ParticularPhone)}
                </div>
                <div className="column">
                  <span>Celular:</span> {formatPhoneNumber(paciente.CellPhone)}
                </div>
              </div>

              <div className="headers">
                <h1>Datos Médicos</h1>
              </div>

              <div className="form-container">
                <div className="column">
                  <span>Ocupación: </span> {paciente.Ocupation}
                </div>
                <div className="column">
                  <span>Grupo Sanguíneo:</span> A
                </div>
                <div className="column">
                  <span>Factor RH:</span> +
                </div>
              </div>

              <div className="form-container">
                <div className="column">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Historia Clínica</span>
                    <Select
                      placeholder="Ingresa una opción"
                      style={{ width: 200, marginTop: 10 }}
                      onChange={() => fetchHistorial(paciente.Id)}
                    >
                      <Option value="1">Médico</Option>
                      <Option value="2">Clínico</Option>
                    </Select>
                  </div>
                </div>
              </div>

            </>
          ) : (
            <div className='empty-text'>No se ha seleccionado un paciente</div>
          )}
        </div>
        {loading || !paciente ? (
          <div></div>
        ) : (
          <div className="image">

            <img
              src={
                //@ts-expect-error
                paciente?.Files?.length
                  //@ts-expect-error
                  ? `http://localhost:3000/${paciente.Files[0].Path}`
                  : image
              }
              alt="Paciente"
            />

          </div>
        )}



      </div>
    </>
  );
};

export default Dashboard;
