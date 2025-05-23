import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Menu() {
  const location = useLocation(); // Obtiene la ubicación actual para resaltar el enlace activo
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

  // Maneja la acción de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("Por favor, introduce un término de búsqueda.");
      return;
    }
    console.log("Buscando:", searchTerm);
  };

  // Estilos minimalistas
  const navbarStyle = {
    background: "#f8f9fa", // Fondo claro
    borderBottom: "2px solid #e9ecef", // Línea inferior para separación
    padding: "10px 20px",
  };

  const brandStyle = {
    color: "#333", // Texto oscuro
    fontSize: "1.5em",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const navLinkStyle = {
    color: "#555",
    fontSize: "1em",
    margin: "0 10px",
    textDecoration: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    transition: "background-color 0.2s, color 0.2s",
  };

  const navLinkActiveStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
  };

  const searchInputStyle = {
    border: "1px solid #ddd",
    borderRadius: "20px",
    padding: "8px 15px",
    width: "200px",
    marginRight: "10px",
  };

  const searchButtonStyle = {
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "8px 15px",
    cursor: "pointer",
  };

  const navLinks = [
    { path: "/tabla", label: "Agregar Alumno" },
    { path: "/maestros", label: "Maestros" },
    { path: "/TablaMaestros", label: "Agregar Maestro" },
  ];

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {}
        <Link className="navbar-brand" to="/" style={brandStyle}>
          Alumnos
        </Link>

        {/* Menú de navegación */}
        <div>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              style={{
                ...navLinkStyle,
                ...(location.pathname === link.path ? navLinkActiveStyle : {}),
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Barra de búsqueda */}
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
          <button type="submit" style={searchButtonStyle}>
            Buscar
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Menu;
