// Importamos las dependencias necesarias para este componente.
import React, { useEffect, useState } from "react"; // React y hooks para manejar el estado y los efectos.
import axios from "axios"; // Para realizar peticiones HTTP.
import { Modal, Button, Spinner } from "react-bootstrap"; // Componentes de Bootstrap para modal, botón y spinner.

// Componente `AlumnoCard` que muestra la información básica de un alumno en una tarjeta.
function AlumnoCard({ alumno, onMoreDetails }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {/* Imagen del alumno */}
        <img
          src={alumno.imagen || "/fallback-image.jpg"} // Muestra una imagen del alumno o una de respaldo si no existe.
          className="card-img-top img-thumbnail mx-auto mt-3"
          alt={alumno.nombre}
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          {/* Nombre y datos básicos del alumno */}
          <h5 className="card-title">{alumno.nombre}</h5>
          <p className="card-text">
            <strong>Matrícula:</strong> {alumno.matricula} <br />
            <strong>Edad:</strong> {alumno.edad}
          </p>
        </div>
        <div className="card-footer text-center">
          {/* Botón para ver más detalles del alumno */}
          <Button variant="primary" onClick={() => onMoreDetails(alumno)}>
            Ver detalles
          </Button>
        </div>
      </div>
    </div>
  );
}

// Componente principal `Home`.
function Home() {
  // Definimos los estados principales.
  const [data, setData] = useState([]); // Lista de alumnos.
  const [loading, setLoading] = useState(true); // Indicador de carga.
  const [selectedAlumno, setSelectedAlumno] = useState(null); // Alumno seleccionado para mostrar detalles.
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal.
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda ingresado.

  // Efecto para cargar los datos de los alumnos al montar el componente.
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/alumnos") // Realiza una petición GET a la API.
      .then((response) => setData(response.data)) // Almacena los datos recibidos en el estado.
      .finally(() => setLoading(false)); // Oculta el spinner una vez que se completan las operaciones.
  }, []);

  // Muestra el modal con los detalles de un alumno seleccionado.
  const handleMoreDetails = (alumno) => {
    setSelectedAlumno(alumno);
    setShowModal(true);
  };

  // Cierra el modal y reinicia el estado de alumno seleccionado.
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlumno(null);
  };

  // Filtra los alumnos según el término de búsqueda.
  const filteredAlumnos = data.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || // Busca coincidencias en el nombre.
    alumno.matricula.toLowerCase().includes(searchTerm.toLowerCase()) || // O en la matrícula.
    alumno.carrera.toLowerCase().includes(searchTerm.toLowerCase()) // O en la carrera.
  );

  // Renderiza la interfaz principal.
  return (
    <div className="container mt-4">
      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre, matrícula o carrera"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el término ingresado.
        />
      </div>

      {/* Muestra un spinner mientras se cargan los datos */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {/* Renderiza una tarjeta por cada alumno filtrado */}
          {filteredAlumnos.map((alumno) => (
            <AlumnoCard key={alumno.id} alumno={alumno} onMoreDetails={handleMoreDetails} />
          ))}
        </div>
      )}

      {/* Modal que muestra detalles del alumno */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlumno && (
            <div>
              <p><strong>Matrícula:</strong> {selectedAlumno.matricula}</p>
              <p><strong>Nombre:</strong> {selectedAlumno.nombre}</p>
              <p><strong>Edad:</strong> {selectedAlumno.edad}</p>
              <p><strong>Carrera:</strong> {selectedAlumno.carrera}</p>
              <p><strong>Semestre:</strong> {selectedAlumno.semestre}</p>
              <p><strong>Turno:</strong> {selectedAlumno.turno}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// Exporta el componente `Home` para su uso en otras partes de la aplicación.
export default Home;


