import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";

function MaestroCard({ maestro, onMoreDetails }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {/* Imagen del maestro */}
        <img
          src={maestro.imagen || "/fallback-image.jpg"} // Si no hay imagen, utiliza una por defecto
          className="card-img-top img-thumbnail mx-auto mt-3"
          alt={maestro.nombre}
          style={{ width: "120px", height: "120px", objectFit: "cover" }} // Asegura un tamaño consistente para las imágenes
        />
        <div className="card-body text-center">
          {/* Nombre y datos principales */}
          <h5 className="card-title">{maestro.nombre}</h5>
          <p className="card-text">
            <strong>Especialidad:</strong> {maestro.especialidad} <br />
            <strong>Turno:</strong> {maestro.turno}
          </p>
        </div>
        <div className="card-footer text-center">
          {/* Botón para más detalles */}
          <Button variant="primary" onClick={() => onMoreDetails(maestro)}>
            Ver detalles
          </Button>
        </div>
      </div>
    </div>
  );
}

function Maestros() {
  const [data, setData] = useState([]); // Estado para almacenar maestros
  const [loading, setLoading] = useState(true); // Estado de carga
  const [selectedMaestro, setSelectedMaestro] = useState(null); // Maestro seleccionado para el modal
  const [showModal, setShowModal] = useState(false); // Control del modal
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

  // Cargar datos desde la API
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/maestros") // Llama a la API para obtener los datos
      .then((response) => setData(response.data)) // Almacena los datos en el estado
      .finally(() => setLoading(false)); // Oculta el spinner después de cargar
  }, []);

  // Mostrar detalles de un maestro
  const handleMoreDetails = (maestro) => {
    setSelectedMaestro(maestro); // Configura el maestro seleccionado
    setShowModal(true); // Muestra el modal
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false); // Oculta el modal
    setSelectedMaestro(null); // Limpia el maestro seleccionado
  };

  // Filtrar los maestros según el término de búsqueda
  const filteredMaestros = data.filter((maestro) =>
    maestro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || // Búsqueda por nombre
    maestro.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) || // Búsqueda por especialidad
    maestro.turno.toLowerCase().includes(searchTerm.toLowerCase()) // Búsqueda por turno
  );

  return (
    <div className="container mt-4">
      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre, especialidad o turno"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        />
      </div>

      {/* Spinner de carga */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {/* Muestra las tarjetas de los maestros filtrados */}
          {filteredMaestros.map((maestro) => (
            <MaestroCard
              key={maestro.id} // Clave única para cada maestro
              maestro={maestro}
              onMoreDetails={handleMoreDetails} // Pasar función para más detalles
            />
          ))}
        </div>
      )}

      {/* Modal para detalles */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Maestro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMaestro && (
            <div>
              <p><strong>Nombre:</strong> {selectedMaestro.nombre}</p>
              <p><strong>Especialidad:</strong> {selectedMaestro.especialidad}</p>
              <p><strong>Turno:</strong> {selectedMaestro.turno}</p>
              <p><strong>Antigüedad:</strong> {selectedMaestro.antiguedad}</p> {/* Campo adicional */}
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

export default Maestros;