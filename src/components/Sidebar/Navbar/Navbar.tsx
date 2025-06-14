import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { SearchOutlined } from "@ant-design/icons";
import { MdPerson } from "react-icons/md";
import { Dropdown, Menu, Select } from "antd";
// import { getUsers } from "../../../domain/entities/MedicalUsers";
// import { PacientesRepositoryImpl } from "../../../domain/repositories/PacientesRepositoryImpl";
// import { PacientesUseCases } from "../../../core/useCases/PacientesUseCases";
import { usePacienteContext } from "../../../context/DashboardContext";


// const pacientRepository = new PacientesRepositoryImpl();
// const pacientesUseCases = new PacientesUseCases(pacientRepository);

const {Option} = Select;

interface LoginProps {
  onLogout: () => void;
}

const Navbar: React.FC<LoginProps> = ({ onLogout }) => {
  // Estado para recuperar el usuario de la sesión
  const [usuario, setUsuario] = useState("");
  const [role, setRole] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  //const [usuarios, setUsuarios]= useState<getUsers[]>([]);
  const {refreshPacientes}= usePacienteContext();
  const {fetchPaciente, pacientes}= usePacienteContext();

  const getUser = () => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("rol");
    setUsuario(username || "");
    setRole(role || "");
  };

 

  // Opciones del dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1">Perfil</Menu.Item>
      <Menu.Item key="2" onClick={onLogout}>Cerrar sesión</Menu.Item>
    </Menu>
  );

  

  // const fetchUsers= async() => {
  //   try{
  //     const response= await pacientesUseCases.getPacientes();
  //     setUsuarios(response);

  //   }catch(error){
  //     console.error("Error al cargar los pacientes", error);
  //   }
  // };

  useEffect(() => {
    getUser();
    refreshPacientes();
  }, [usuario]);

  const handleSearchChange= async(value: string) => {
    setSearchValue(value);
    await fetchPaciente(value);
  }

  return (
    <>
      <nav className="navbar">
        {/* Datos del usuario */}
        <div className="user-data">
          <span>{usuario}</span>
          {role}
        </div>

        {/* Íconos */}
        <div className="icons">
          {/* Búsqueda */}
          <div className="search">
            {isSearchActive ? (
              <Select
                 placeholder="Selecciona un paciente"
                 suffixIcon={<SearchOutlined />}
                 showSearch
                 onBlur={() => setIsSearchActive(false)}
                 onChange={handleSearchChange}
                 value={searchValue}
                 style={{
                   width: 200
                 }}
                 filterOption={(input, option) =>
                  option?.children
                    ? option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    : false
                }
              >
                
                {pacientes?.map((item) => (
                  <Option 
                     key={item.Id}
                     value={item.Id}
                  >{item.Name} {item.PaternalSurname} {item.MaternalSurname}</Option>
                ))}
              </Select>
            ) : (
              <SearchOutlined
                onClick={() => setIsSearchActive(true)}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            )}
          </div>

          {/* Dropdown para el perfil */}
          <div className="profile">
            <Dropdown overlay={menu} trigger={["click"]}>
              <MdPerson style={{ fontSize: 20, cursor: "pointer" }} />
            </Dropdown>
          </div>
        </div>
      </nav>

      
    </>
  );
};

export default Navbar;

