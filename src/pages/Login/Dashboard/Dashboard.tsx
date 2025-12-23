import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import image from '../../../../public/images/image.webp';
// import { Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePacienteContext } from '../../../context/DashboardContext';
import moment from 'moment';
// import { HistorialClinicoUseCases } from '../../../core/useCases/HistorialClinicoUseCases';
// import { HistorialMedicoRepositoryImpl } from '../../../domain/repositories/HistorialClinicoRepositoryImpl';
//import MultiCircleSpinner from './MultiCircleSpinner';
import RedCrossSpinner from './RedCrossSpinner';

import { NotesRepositoryImpl } from '../../../domain/repositories/NotesRepositoryImpl';
import { NotesUseCases } from '../../../core/useCases/NotesUseCases';
import { getNotes, newEditNote } from '../../../domain/entities/Notes';
import { EditNoteModal, NewNoteModal } from './NotasModal';
import { Popconfirm } from 'antd';
import { getSeguimiento, newSeguimiento, updateSeguimiento } from '../../../domain/entities/Seguimiento';
import { SeguimientoRepositoryImpl } from '../../../domain/repositories/SeguimientoRepositoryImpl';
import { SeguimientoUseCases } from '../../../core/useCases/SeguimientoUseCases';
import { EditSeguimientoModal, NewSeguimientoModal } from './SeguimientoModal';




const notesRepository = new NotesRepositoryImpl();
const notesUseCases = new NotesUseCases(notesRepository);

const seguimientoRepository = new SeguimientoRepositoryImpl();
const seguimientoUseCases = new SeguimientoUseCases(seguimientoRepository);


// const historialRepository = new HistorialMedicoRepositoryImpl();
// const historialUseCases = new HistorialClinicoUseCases(historialRepository);


//const { Option } = Select;
const Dashboard: React.FC = () => {

  const { paciente, loading } = usePacienteContext();
  //gestionamos los modales de notas
  const [notasModal, setNotasModal] = useState(false);
  const [editarNotaModal, setEditarNotaModal] = useState(false);
  const [datoFila, setDatoFila] = useState<getNotes | null>(null);
  const [seguimiento, setSeguimiento] = useState<getSeguimiento[]>([]);
  const [seguimientoModal, setSeguimientoModal] = useState(false);
  const [editSeguimientoModal, setEditSeguimientoModal] = useState(false);
  const [seguimientoDatoFila, setSeguimientoDatoFila] = useState<getSeguimiento | null>(null);
  //Creamos una funcion para los modales de notas medicas
  const toggleNotasModal = () => {
    setNotasModal(true);
  };

  const handleEditNote = (record: getNotes) => {
    setDatoFila(record);
    setEditarNotaModal(true);
  };

  const seguimientoModalToggle = () => {
    setSeguimientoModal(true);
  };

  const handleToggleEditSeguimiento = (record: getSeguimiento) =>{
    setSeguimientoDatoFila(record);
    setEditSeguimientoModal(true);
  };




  const [notas, setNotas] = useState<getNotes[]>([]);




  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Dividir en partes
    return match ? `${match[1]}-${match[2]}-${match[3]}` : phone; // Formatear
  };




  const fetchNotes = async (patientId: string) => {
    try {
      const response = await notesUseCases.getNotesByPatient(patientId);
      console.log('notas obtenidas', response);
      setNotas(response);
    } catch (error) {
      console.error("Error al obtener las notas", error);

    }
  };

  const fetchSeguimiento = async (patientId: string) => {
    try {
      const response = await seguimientoUseCases.getSeguimientoByPatientId(patientId);
      console.log("seguimiento obtenido", response);
      setSeguimiento(response);

    } catch (error) {
      console.error("Error al obtener el seguimiento", error);
    }
  }

  useEffect(() => {
    if (paciente) {
      fetchNotes(paciente.Id);
      fetchSeguimiento(paciente.Id);
    }
  }, [paciente]);

  const handleNewNote = async (values: newEditNote) => {
    try {
      await notesUseCases.newNote(values);
      if (paciente) {
        fetchNotes(paciente.Id);
      }

    } catch (error) {
      console.error("Error al crear una nueva nota", error)
    };
  };

  const handleSubmitEditNote = async (newData: getNotes) => {
    try {
      await notesUseCases.editNote(newData);
      if (paciente) {
        fetchNotes(paciente.Id);
      }
    } catch (error) {
      console.error('Error al editar la nota', error);
    }
  };

  const handleDeleteNote = async (Id: string) => {

    try {
      await notesUseCases.deleteNote(Id);
      if (paciente) {
        fetchNotes(paciente.Id);
      }
    } catch (error) {
      console.error('Error al eliminar la nota', error);
    }
  };

  const handleSaveSeguimiento= async(newData: newSeguimiento) =>{
    try{
      await seguimientoUseCases.newSeguimiento(newData);
      if(paciente){
        fetchSeguimiento(paciente.Id);
      }
    }catch(error){
      console.error('Error al guardar el seguimiento', error);
    }
  };

  const handleEditSeguimiento = async(newData: updateSeguimiento) =>{
    try{
       await seguimientoUseCases.updateSeguimiento(newData);
       if(paciente){
        fetchSeguimiento(paciente.Id);
       }
    }catch(error){
      console.error('Error al editar el seguimiento', error);
    }
  };

  const handleDeleteSeguimiento = async(Id: string) =>{
    try{
      await seguimientoUseCases.deleteSeguimiento(Id);
      if(paciente){
        fetchSeguimiento(paciente.Id);
      }

    }catch(error){
      console.error('Error al eliminar el seguimiento', error);
    }
  }
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
                  <span>Grupo Sanguíneo:</span> {paciente.BloodType}
                </div>
                <div className="column">
                  <span>Factor RH:</span> {paciente.RHFactor}
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
                        <button className="btn-agregar" onClick={toggleNotasModal}><PlusOutlined /> Nuevo</button>
                      </div>
                      {notas.length > 0 ? (
                        <div className="grid-3">
                          {notas.map(item => (
                            <div key={item.id} className="item">
                              <div><span>Fecha:</span> <p>{item.Date}</p></div>
                              <div><span>Tipo:</span> <p>{item.NoteType}</p></div>
                              <div><span>Médico:</span> <p>{item.Doctor}</p></div>
                              <div><span>Descripción:</span><p>{item.Description}</p> </div>
                              <button
                                className="btn-editar"
                                onClick={() => handleEditNote(item)}
                              >
                                <span className='btn-editar-text'><EditOutlined />Editar</span> 
                              
                              </button>
                              <Popconfirm
                                title="Eliminar nota"
                                description="¿Estás seguro de que deseas eliminar esta nota? Esta acción no se puede deshacer."
                                okText="Sí"
                                cancelText="No"
                                onConfirm={() => handleDeleteNote(item.id)}
                              >
                                <button className="btn-eliminar">
                                  <span><DeleteOutlined /> Eliminar</span>
                                </button>
                              </Popconfirm>

                            </div>
                          ))}


                        </div>

                      ) : (
                        <div className='empty-text-cards'>No hay datos disponibles</div>
                      )}


                    </div>

                    {/* Seguimiento / Tratamientos */}
                    <div className="section">
                      <div className="section-header">
                        <span className="section-title">Seguimiento / Tratamientos</span>
                        <button className="btn-agregar" onClick={seguimientoModalToggle}><PlusOutlined /> Nuevo</button>
                      </div>
                      {seguimiento.length > 0 ? (
                        <div className="grid-3">
                          {seguimiento.map((item) => (
                            <div key={item.Id} className="item">
                              <div><span>Fecha:</span> <p>{moment(item.Date).format("DD/MM/YYYY")}</p></div>
                              <div><span>Motivo:</span> <p>{item.Motivation}</p></div>
                              <div><span>Observaciones:</span> <p>{item.Observations}</p></div>
                              <div><span>Tratamiento:</span> <p>{item.Treathment}</p></div>
                              <div><span>Próxima cita:</span> <p>{moment(item.NextAppointment).format("DD/MM/YYYY")}</p></div>
                              <button 
                                 className="btn-editar" 
                                 onClick={() => handleToggleEditSeguimiento(item)}
                              >
                                <span><EditOutlined /> Editar</span>
                              </button>
                              <Popconfirm
                                title="Eliminar seguimiento"
                                description="¿Estás seguro de que deseas eliminar este seguimiento? Esta acción no se puede deshacer."
                                okText="Sí"
                                cancelText="No"
                                onConfirm={() => handleDeleteSeguimiento(item.Id)}
                              >
                                <button className="btn-eliminar">
                                  <span><DeleteOutlined /> Eliminar</span>
                                </button>
                              </Popconfirm>
                            </div>
                          ))}


                        </div>
                      ) : (
                        <div className='empty-text-cards'>No hay datos disponibles</div>
                      )}





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
      <NewNoteModal
        open={notasModal}

        paciente={paciente}
        onClose={() => setNotasModal(false)}
        onSubmit={handleNewNote}
      />

      <EditNoteModal
        open={editarNotaModal}
        onClose={() => setEditarNotaModal(false)}
        datoFila={datoFila}
        onSubmit={handleSubmitEditNote}
      />

      <NewSeguimientoModal
        open={seguimientoModal}
        onClose={() => setSeguimientoModal(false)}
        onSave={handleSaveSeguimiento}
        paciente={paciente}
      />

      <EditSeguimientoModal
        open={editSeguimientoModal}
        onCancel={() => setEditSeguimientoModal(false)}
        datoFila={seguimientoDatoFila}
        onSave={handleEditSeguimiento}
      />
    </>
  );
};

export default Dashboard;
