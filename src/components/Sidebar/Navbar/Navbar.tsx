import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { SearchOutlined } from "@ant-design/icons";
import { MdPerson } from "react-icons/md";
import { Dropdown, Menu, Select } from "antd";
import { usePacienteContext } from "../../../context/DashboardContext";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface LoginProps {
  onLogout: () => void;
}

const Navbar: React.FC<LoginProps> = ({ onLogout }) => {
  const [usuario, setUsuario] = useState("");
  const [role, setRole] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { refreshPacientes, fetchPaciente, pacientes } = usePacienteContext();
  const navigate= useNavigate();

  const getUser = () => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("rol");
    setUsuario(username || "");
    setRole(role || "");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={()=> navigate("/perfil")}>Perfil</Menu.Item>
      <Menu.Item key="2" onClick={onLogout}>Cerrar sesión</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    getUser();
    refreshPacientes();
  }, [usuario]);

  const handleSearchChange = async (value: string) => {
    setSearchValue(value);
    await fetchPaciente(value);
  };

  return (
    <>
      <nav className="navbar">
        {/* Datos del usuario */}
        <div className="user-data">
          <span>{usuario}</span>
          <p>{role}</p>
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
                value={searchValue || ''}
                style={{ width: 300 }}
                notFoundContent="No hay pacientes disponibles"
                filterOption={(input, option) =>
                  option?.children
                    ?.toString()
                    .toLowerCase()
                    .includes(input.toLowerCase()) ?? false
                }
              >
                {pacientes
                  ?.filter(
                    (item) =>
                      item.Name?.trim() &&
                      item.PaternalSurname?.trim() &&
                      item.MaternalSurname?.trim()
                  )
                  .map((item) => (
                    <Option key={item.Id} value={item.Id}>
                      {item.Name} {item.PaternalSurname} {item.MaternalSurname}
                    </Option>
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
