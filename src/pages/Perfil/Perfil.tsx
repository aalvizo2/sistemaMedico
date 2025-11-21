import React, { useState } from "react";
import { Tabs, Input, Button, Switch, Divider, Select, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BgColorsOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const { TabPane } = Tabs;
const { Option } = Select;

const Perfil: React.FC = () => {
  const { logout } = useAuth();
  const [color, setColor] = useState("#1677ff");
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("es");

  const handleSave = (section: string) => {
    message.success(`Cambios de ${section} guardados correctamente`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px",
        background: darkMode ? "#0f172a" : "transparent",
      }}
    >
      <div
        style={{
          background: darkMode ? "#1e293b" : "#ffffff",
          padding: 30,
          borderRadius: 16,
          width: "800px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          color: darkMode ? "#f1f5f9" : "#0f172a",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          <SettingOutlined /> Configuración de Perfil
        </h2>

        <Tabs defaultActiveKey="1" centered tabBarGutter={50}>
          {/* Apariencia */}
          <TabPane
            tab={
              <span>
                <BgColorsOutlined /> Apariencia
              </span>
            }
            key="1"
          >
            <label>Color principal:</label>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: 100, marginLeft: 10 }}
            />

            <div style={{ marginTop: 20 }}>
              <label>Tema oscuro:</label>{" "}
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                style={{ marginLeft: 10 }}
              />
            </div>

            <Divider />
            <Button type="primary" onClick={() => handleSave("apariencia")}>
              Guardar cambios
            </Button>
          </TabPane>

          {/* Seguridad */}
          <TabPane
            tab={
              <span>
                <LockOutlined /> Seguridad
              </span>
            }
            key="2"
          >
            <label>Nueva contraseña:</label>
            <Input.Password
              placeholder="Introduce nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", marginTop: 8 }}
            />
            <Divider />
            <Button type="primary" onClick={() => handleSave("seguridad")}>
              Actualizar contraseña
            </Button>
          </TabPane>

          {/* Preferencias */}
          <TabPane
            tab={
              <span>
                <UserOutlined /> Preferencias
              </span>
            }
            key="3"
          >
            <label>Idioma:</label>
            <Select
              value={language}
              onChange={setLanguage}
              style={{ width: 200, marginLeft: 10 }}
            >
              <Option value="es">Español</Option>
              <Option value="en">Inglés</Option>
            </Select>

            <Divider />
            <Button type="primary" onClick={() => handleSave("preferencias")}>
              Guardar preferencias
            </Button>
          </TabPane>

          {/* Notificaciones */}
          <TabPane
            tab={
              <span>
                <BellOutlined /> Notificaciones
              </span>
            }
            key="4"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div>
                <Switch defaultChecked /> Notificar por correo
              </div>
              <div>
                <Switch /> Notificar por SMS
              </div>
              <div>
                <Switch defaultChecked /> Alertas del sistema
              </div>
            </div>

            <Divider />
            <Button type="primary" onClick={() => handleSave("notificaciones")}>
              Guardar configuración
            </Button>
          </TabPane>

          {/* Sesión */}
          <TabPane
            tab={
              <span>
                <LogoutOutlined /> Sesión
              </span>
            }
            key="5"
          >
            <p>Salir de tu cuenta de forma segura.</p>
            <Button danger type="primary" onClick={logout}>
              Cerrar sesión
            </Button>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Perfil;
