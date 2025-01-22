import React from 'react';
import './Dashboard.css';
import image from '../../../../public/images/image.webp';
import { Select } from 'antd';


const { Option } = Select;
const Dashboard: React.FC = () => {
  return (
    <>
      <div className="encabezado">
         
      </div>
      <h1>Datos del Paciente</h1>
      <div className='form-container'>
        <div className="column"><span>Nombre(s):</span> Alan Esteban</div>
        <div className="column"><span>Apellido Paterno: </span> Alvizo</div>
        <div className="column"><span>Apellido Materno: </span> Ortega</div>
        
      </div>
      <div className='form-container'>
        <div className="column"><span>Fecha de Nacimiento:</span> 24/07/1993</div>
        <div className="column"><span>Edad: </span> 31</div>
        <div className="column"><span>Lugar de Nacimiento: </span>Arandas</div>
        
      </div>
      <div className='form-container'>
        <div className="column"><span>Domicilio: </span> Vallarta 520 Int 305A</div>
        <div className="column"><span>Teléfono:</span> 348-688-1334</div>
        <div className="column"><span>Celular:</span> 333-256-6577</div>
        
      </div>

      <div className="headers">
        <h1>Datos Médicos</h1>
      </div>


      <div className='form-container'>
        <div className="column"><span>Ocupación: </span> Desarrollador Web</div>
        <div className="column"><span>Grupo Sanguíneo:</span> A</div>
        <div className="column"><span>Factor RH:</span> + </div>
        
      </div>

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
                  style={{ width: 200, marginTop: 10}}
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

      <div className="image">
        <img src={image} alt="imagen" />
      </div>

      
      
    </>
  );
};

export default Dashboard;
