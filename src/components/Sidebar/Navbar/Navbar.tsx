import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { SearchOutlined } from "@ant-design/icons";
import { MdPerson } from "react-icons/md";
import { Input, Dropdown, Menu } from "antd";

interface LoginProps{
    onLogout: () => void;
}
const Navbar: React.FC<LoginProps> = ({onLogout}) => {
  // Estado para recuperar el usuario de la sesión
  const [usuario, setUsuario] = useState("");
  const [role, setRole] = useState<string>("");

  // Estado para controlar la búsqueda
  const [isSearchActive, setIsSearchActive] = useState(false);

  const getUser = () => {
    const username = localStorage.getItem("username");
    const role= localStorage.getItem("rol");
    setUsuario(username || "");
    setRole(role || "");
  };

  useEffect(() => {
    getUser();
  }, []);

  // Opciones del dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1">Perfil</Menu.Item>
      <Menu.Item key="2" onClick={onLogout}>Cerrar sesión</Menu.Item>
    </Menu>
  );

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
              <Input
                placeholder="Buscar..."
                onBlur={() => setIsSearchActive(false)} // Cierra el input al perder el foco
                style={{ width: 200 }}
                prefix={<SearchOutlined /> }
              />
            ) : (
              <SearchOutlined
                onClick={() => setIsSearchActive(true)} // Muestra el input al hacer clic
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
