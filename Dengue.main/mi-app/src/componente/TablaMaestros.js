import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import "./tabla.css";

// Componente de alerta para mostrar mensajes
const AlertMessage = ({ message, type, onDismiss }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);
  return message && <div className={`alert alert-${type} mb-3`}>{message}</div>;
};

// Componente para validar campos del formulario
const ValidatedInput = ({ name, value, onChange, error, type = "text" }) => (
  <>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control mb-2 ${error ? "is-invalid" : ""}`}
      placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </>
);

const TablaMaestros = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [editingId, setEditingId] = useState(null);
  const [newMaestro, setNewMaestro] = useState({
    nombre: "",
    especialidad: "",
    antiguedad: "",
    turno: "",
    imagen: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/maestros");
        setData(data);
      } catch {
        setNotification({ message: "Error al cargar datos", type: "danger" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const errors = {};
    ["nombre", "especialidad", "antiguedad", "turno", "imagen"].forEach((field) => {
      if (!newMaestro[field]) errors[field] = "Obligatorio.";
    });
    setFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = editingId
        ? await axios.put(`http://localhost:3001/api/maestros/${editingId}`, newMaestro)
        : await axios.post("http://localhost:3001/api/maestros", newMaestro);
      setData((prev) =>
        editingId
          ? prev.map((item) => (item.id === editingId ? response.data : item))
          : [...prev, response.data]
      );
      setNotification({ message: editingId ? "Cambios guardados" : "Maestro agregado", type: "success" });
      resetForm();
    } catch {
      setNotification({ message: "Error al guardar datos", type: "danger" });
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar este maestro?")) {
      try {
        await axios.delete(`http://localhost:3001/api/maestros/${id}`);
        setData((prev) => prev.filter((item) => item.id !== id));
        setNotification({ message: "Maestro eliminado", type: "success" });
      } catch {
        setNotification({ message: "Error al eliminar", type: "danger" });
      }
    }
  };

  const handleModificar = (id) => {
    setNewMaestro(data.find((item) => item.id === id));
    setEditingId(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaestro((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const resetForm = () => {
    setEditingId(null);
    setNewMaestro({ nombre: "", especialidad: "", antiguedad: "", turno: "", imagen: "" });
    setFormErrors({});
  };

  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <AlertMessage
        message={notification.message}
        type={notification.type}
        onDismiss={() => setNotification({ message: "", type: "" })}
      />

      <div className="mb-4">
        <h5 className="mb-2 text-center">Agregar/Modificar Maestro</h5>
        <div className="row">
          <div className="col-md-12">
            {["nombre", "especialidad", "antiguedad", "turno", "imagen"].map((field) => (
              <ValidatedInput
                key={field}
                name={field}
                value={newMaestro[field]}
                onChange={handleInputChange}
                error={formErrors[field]}
              />
            ))}
          </div>
          <div className="col-md-12 d-grid">
            <Button variant="primary" onClick={handleSubmit} size="lg">
              {editingId ? "Guardar" : "Agregar"}
            </Button>
          </div>
        </div>
        <div className="col-md-12 d-grid mt-3">
          <Button variant="success" onClick={toggleTable} size="lg">
            {showTable ? "Ocultar Tabla" : "Mostrar Tabla"}
          </Button>
        </div>
      </div>

      {showTable && (
        <Table striped bordered hover className="text-center mt-3" style={{ fontSize: "1.1rem" }}>
          <thead>
            <tr>
              {["Nombre", "Especialidad", "Antigüedad", "Turno", "Imagen", "Acciones"].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.especialidad}</td>
                <td>{item.antiguedad}</td>
                <td>{item.turno}</td>
                <td>
                  <img src={item.imagen} alt={item.nombre} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleEliminar(item.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Eliminar
                  </Button>
                  <Button variant="warning" onClick={() => handleModificar(item.id)}>
                    Modificar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TablaMaestros;

