import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = () => {
    axios.get('http://localhost:3000/api/items')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.mensaje || err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este item?')) {
      axios.delete(`http://localhost:3000/api/items/${id}`)
        .then(() => {
          setItems(prevItems => prevItems.filter(item => item._id !== id));
        })
        .catch(err => {
          alert('Error al eliminar: ' + (err.response?.data?.mensaje || err.message));
        });
    }
  };

  if (loading) return <p style={{ textAlign: 'center', fontSize: '18px' }}>Cargando...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>Error: {error}</p>;

  const tableStyle = {
    width: '90%',
    margin: '0 auto 30px auto', // Centrado
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f7fa',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    borderRadius: '10px',
  };

  const headerCellStyle = {
    padding: '12px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  };

  const rowStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
  };

  const cellStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #eee',
    textAlign: 'center',
  };

  const deleteButtonStyle = {
    padding: '8px 10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: '600',
  };

  const deleteHover = e => {
    e.target.style.backgroundColor = '#c0392b';
  };

  const deleteLeave = e => {
    e.target.style.backgroundColor = '#e74c3c';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", marginBottom: '20px', color: '#333', textAlign: 'center' }}>Lista de Items</h2>
      
      {/* Tabla principal */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>ID</th>
            <th style={headerCellStyle}>Colonia</th>
            <th style={headerCellStyle}>Municipio</th>
            <th style={headerCellStyle}>Jurisdicción</th>
            <th style={headerCellStyle}>Estado</th>
            <th style={headerCellStyle}>Fecha</th>
            <th style={headerCellStyle}>Casas Existentes</th>
            <th style={headerCellStyle}>Manzanas Existentes</th>
            <th style={headerCellStyle}>Habitantes</th>
            <th style={headerCellStyle}>Tipo Estudio</th>
            <th style={headerCellStyle}>Semana Epidemiológica</th>
            <th style={headerCellStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id} style={rowStyle}>
              <td style={cellStyle}>{index + 1}</td>
              <td style={cellStyle}>{item.colonia}</td>
              <td style={cellStyle}>{item.municipio}</td>
              <td style={cellStyle}>{item.jurisdiccion}</td>
              <td style={cellStyle}>{item.estado}</td>
              <td style={cellStyle}>{new Date(item.fecha).toLocaleDateString()}</td>
              <td style={cellStyle}>{item.casas_existentes}</td>
              <td style={cellStyle}>{item.manzanas_existentes}</td>
              <td style={cellStyle}>{item.habitantes}</td>
              <td style={cellStyle}>{item.encuesta}</td>
              <td style={cellStyle}>{item.semana_epidemiologica}</td>
              <td style={cellStyle}>
                <button
                  style={deleteButtonStyle}
                  onMouseEnter={deleteHover}
                  onMouseLeave={deleteLeave}
                  onClick={() => handleDelete(item._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ListaItems;
