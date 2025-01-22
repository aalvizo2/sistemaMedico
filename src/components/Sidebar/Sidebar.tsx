import React from 'react';
import '../Sidebar.css';
import { EditOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { FaNotesMedical, FaTrash } from "react-icons/fa";
import { MdBloodtype } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { TbCircleNumber1 } from 'react-icons/tb';
import { Tooltip } from 'antd'; // Importa el componente Tooltip

const Sidebar: React.FC = () => {
    const items = [
        {label: "Inicio", icon: <HomeOutlined />, path: "/dashboard"},
        { label: "Nuevo Registro", icon: <PlusOutlined />, path: "/nuevo" },
        { label: "Editar", icon: <EditOutlined />, path: "/editar" },
        { label: "Registros Eliminados", icon: <FaTrash />, path: "/eliminar" },
        { label: "Tipos de Sangre", icon: <MdBloodtype />, path: "/tipo-sangre" },
        { label: "Seguimiento", icon: <TbCircleNumber1 />, path: "/seguimiento" },
        { label: "Notas", icon: <FaNotesMedical />, path: "/notas" }
    ];

    return (
        <>
            <nav className="sidebar">
                {items.map(item => (
                    <Tooltip key={item.label} title={item.label} placement="right">
                        <Link to={item.path}>
                            {item.icon}
                        </Link>
                    </Tooltip>
                ))}
            </nav>
        </>
    );
};

export default Sidebar;
