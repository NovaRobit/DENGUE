// src/componentes/ResumenRecipientes.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const ResumenRecipientes = () => {
  const location = useLocation();
  const { recipientes } = location.state || {};

  if (!recipientes) return <p>No hay datos de recipientes para mostrar.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Resumen de Inventario de Recipientes</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Recipiente</th>
            <th>E</th>
            <th>A</th>
            <th>P</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(recipientes).map(([tipo, datos]) => (
            <tr key={tipo}>
              <td>{tipo}</td>
              <td>{datos.E || 0}</td>
              <td>{datos.A || 0}</td>
              <td>{datos.P || 0}</td>
              <td>{datos.L || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumenRecipientes;
