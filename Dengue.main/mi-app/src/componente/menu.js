import { Link, useLocation } from "react-router-dom";

function Menu() {
  const location = useLocation(); // Obtiene la ubicación actual para resaltar el enlace activo

  // Estilos
  const styles = {
    navbar: {
      background: "#f8f9fa",
      borderBottom: "2px solid #e9ecef",
      padding: "10px 20px",
    },
    brand: {
      color: "#333",
      fontSize: "1.5em",
      fontWeight: "bold",
      textDecoration: "none",
    },
    navLink: {
      color: "#555",
      fontSize: "1em",
      margin: "0 10px",
      textDecoration: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      transition: "background-color 0.2s, color 0.2s",
    },
    navLinkActive: {
      backgroundColor: "#007bff",
      color: "#fff",
    },
  };

  // Enlaces del menú
  const navLinks = [
    { path: "/datos", label: "Datos" },
    { path: "/agregardatos", label: "Agregar Datos" },
    { path: "/archivos", label: "Archivos" },
  ];

  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link className="navbar-brand" to="/" style={styles.brand}>
          DENGUE
        </Link>

        <div>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              style={{
                ...styles.navLink,
                ...(location.pathname === link.path ? styles.navLinkActive : {}),
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
