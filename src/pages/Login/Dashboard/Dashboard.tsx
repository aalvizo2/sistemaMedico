import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import image from '../../../../public/images/image.webp';
// import { Select } from 'antd';

import { usePacienteContext } from '../../../context/DashboardContext';
import moment from 'moment';
// import { HistorialClinicoUseCases } from '../../../core/useCases/HistorialClinicoUseCases';
// import { HistorialMedicoRepositoryImpl } from '../../../domain/repositories/HistorialClinicoRepositoryImpl';
//import MultiCircleSpinner from './MultiCircleSpinner';
import RedCrossSpinner from './RedCrossSpinner';

import { NotesRepositoryImpl } from '../../../domain/repositories/NotesRepositoryImpl';
import { NotesUseCases } from '../../../core/useCases/NotesUseCases';
import { getNotes } from '../../../domain/entities/Notes';

const notesRepository= new NotesRepositoryImpl();
const notesUseCases= new NotesUseCases(notesRepository);


// const historialRepository = new HistorialMedicoRepositoryImpl();
// const historialUseCases = new HistorialClinicoUseCases(historialRepository);


//const { Option } = Select;
const Dashboard: React.FC = () => {

  const { paciente, loading } = usePacienteContext();

  //Agrego unos json temporales para seguimiento
  const seguimiento = [
    {
      id: "1",
      paciente: "Juan Pérez",
      fecha: "2025-10-20",
      motivo: "Dolor de cabeza",
      observaciones: "Se recetó paracetamol y descanso.",
      tratamiento: "Paracetamol 500mg cada 8h.",
      proximaCita: "2025-11-01",
    },
    {
      id: "2",
      paciente: "María López",
      fecha: "2025-10-22",
      motivo: "Revisión postoperatoria",
      observaciones: "Buena cicatrización. Sin complicaciones.",
      tratamiento: "Continuar con antibióticos 3 días más.",
      proximaCita: "2025-10-29",
    },
  ];

  // const notas = [
  //   {
  //     id: "1",
  //     paciente: "Juan Pérez",
  //     fecha: "2025-10-20",
  //     medico: "Dra. María Gómez",
  //     tipoNota: "Evolución",
  //     descripcion: "Paciente presenta mejoría, sin fiebre. Se mantiene tratamiento actual.",
  //   },
  //   {
  //     id: "2",
  //     paciente: "Ana Rodríguez",
  //     fecha: "2025-10-25",
  //     medico: "Dr. Luis Herrera",
  //     tipoNota: "Ingreso",
  //     descripcion: "Ingreso por dolor abdominal. Se ordenan análisis de laboratorio.",
  //   },
  // ]
  const [notas, setNotas] = useState<getNotes[]>([]);

  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Dividir en partes
    return match ? `${match[1]}-${match[2]}-${match[3]}` : phone; // Formatear
  };

  // const fetchHistorial = async (userId: string) => {
  //   setLoading(true);

  //   // función delay con promesa
  //   const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  //   try {
  //     await delay(3000); // espera 3 segundos

  //     const response = await historialUseCases.getHistorial(userId);
  //     console.log(response);

  //   } catch (error) {
  //     console.error('Error al cargar los datos', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const fetchNotes= async(patientId: string)=>{
    try{
      const response= await notesUseCases.getNotesByPatient(patientId);
      console.log('notas obtenidas', response);
      setNotas(response);
    }catch(error){
      console.error("Error al obtener las notas", error);

    }
  };

  useEffect(()=>{
    if(paciente){
      fetchNotes(paciente.Id);
    }
  },[paciente])
  return (
    <>


      {loading ? (
        <div></div>
      ) : paciente ? (
        <div className="main-header">

        </div>

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
              <div className="headers">
                <h1>Datos del Paciente</h1>
              </div>
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

              <div className="headers">
                <h1>Historial Médico</h1>
              </div>
              {/* Historial Médico existente */}
              <div className="form-container">

                <div className="column">
                  <div style={{ display: "flex", flexDirection: "column" }}>

                    {/* Notas Médicas */}
                    <div className="section">
                      <div className="section-header">
                        <span className="section-title">Notas Médicas</span>
                        <button className="btn-agregar">Agregar Nota</button>
                      </div>

                      <div className="grid-3">
                        {notas.map(item => (
                          <div key={item.id} className="item">
                            <div><span>Fecha:</span> {item.Date}</div>
                            <div><span>Tipo:</span> {item.NoteType}</div>
                            <div><span>Médico:</span> {item.Doctor}</div>
                            <div><span>Descripción:</span>{item.Description} </div>
                            <button className="btn-editar">Editar</button>
                          </div>
                        ))}


                      </div>

                    </div>

                    {/* Seguimiento / Tratamientos */}
                    <div className="section">
                      <div className="section-header">
                        <span className="section-title">Seguimiento / Tratamientos</span>
                        <button className="btn-agregar">Agregar Seguimiento</button>
                      </div>



                      <div className="grid-3">
                        {seguimiento.map((item) => (
                          <div key={item.id} className="item">
                            <div><span>Fecha:</span> {moment(item.fecha).format("DD/MM/YYYY")}</div>
                            <div><span>Motivo:</span> {item.motivo}</div>
                            <div><span>Observaciones:</span> {item.observaciones}</div>
                            <div><span>Tratamiento:</span> {item.tratamiento}</div>
                            <div><span>Próxima cita:</span> {moment(item.proximaCita).format("DD/MM/YYYY")}</div>
                            <button className="btn-editar">Editar</button>
                          </div>
                        ))}


                      </div>

                    </div>

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
