import React from 'react';
import './Dashboard.css';
import image from '../../../../public/images/image.webp';
import { Select } from 'antd';

import { usePacienteContext } from '../../../context/DashboardContext';
import moment from 'moment';


const { Option } = Select;
const Dashboard: React.FC = () => {
  const { paciente } = usePacienteContext();

  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Dividir en partes
    return match ? `${match[1]}-${match[2]}-${match[3]}` : phone; // Formatear
  };

  console.log(paciente, "paciente recuperado")
  return (
    <>
      <div className="encabezado">

      </div>
      <h1>Datos del Paciente</h1>

      <div className="contenedor-general">
        <div className="contenedor">
          {paciente && (
            <>
              <div className='form-container'>
                <div className="column"><span>Nombre(s):</span>{paciente.Name}</div>
                <div className="column"><span>Apellido Paterno: </span> {paciente.PaternalSurname}</div>
                <div className="column"><span>Apellido Materno: </span> {paciente.MaternalSurname}</div>


              </div>
              <div className='form-container'>
                <div className="column"><span>Fecha de Nacimiento:</span> {moment(paciente.Birthday).format('DD/MM/YYYY')}</div>
                <div className="column"><span>Edad: </span> {paciente.Age}</div>
                <div className="column"><span>Lugar de Nacimiento: </span>{paciente.BirthPlace}</div>

              </div>
              <div className='form-container'>
                <div className="column"><span>Domicilio: </span> {paciente.Address}</div>
                <div className="column"><span>Teléfono:</span> <span>Teléfono:</span> {formatPhoneNumber(paciente.ParticularPhone)}</div>
                <div className="column"><span>Celular:</span> {formatPhoneNumber(paciente.CellPhone)}</div>


              </div>

            </>
          )}


          <div className="headers">
            <h1>Datos Médicos</h1>
          </div>


          {paciente && (
            <div className='form-container'>
              <div className="column"><span>Ocupación: </span> {paciente.Ocupation}</div>
              <div className="column"><span>Grupo Sanguíneo:</span> A</div>
              <div className="column"><span>Factor RH:</span> + </div>
            </div>
          )}

          <div className="form-container">
            <div className="column">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span>Hístoria Clinica</span>
                <Select
                  placeholder="Ingresa una opción"
                  style={{ width: 200, marginTop: 10 }}
                >
                  <Option value="1">
                    Médico
                  </Option>
                  <Option value="2">
                    Clinico
                  </Option>
                </Select>
              </div>

            </div>
          </div>
        </div>
        <div className="image">
          <img src={image} alt="imagen" />
        </div>
      </div>







    </>
  );
};

export default Dashboard;
