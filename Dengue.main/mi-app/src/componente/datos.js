import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/items')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.mensaje || err.message);
        setLoading(false);
      });
  }, []);

  // Función para desglosar valores con formato "a/b/c/d"
  const desglosarValor = (valor) => {
    if (typeof valor === 'string' && valor.includes('/')) {
      const [total, conAgua, conLarvas, tratados] = valor.split('/');
      return (
        <span>
          {total} (Total: {total}, Con agua: {conAgua}, Con larvas: {conLarvas}, Tratados: {tratados})
        </span>
      );
    }
    return valor;
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Items</h2>
      
      {/* Tabla principal */}
      <table border="1" cellPadding="5" style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Número</th>
            <th style={{ padding: '10px' }}>Calle</th>
            <th style={{ padding: '10px' }}>Habitantes</th>
            <th style={{ padding: '10px' }}>Manzana</th>
            <th style={{ padding: '10px' }}>Sector</th>
            <th style={{ padding: '10px' }}>Positivos</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.id}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.numero}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.calle}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.habitantes}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.manzana}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.sector}</td>
              <td style={{ 
                padding: '8px', 
                border: '1px solid #ddd',
                backgroundColor: item.positivos_totales > 0 ? '#ffdddd' : '#ddffdd',
                fontWeight: 'bold'
              }}>
                {item.positivos_totales}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <button 
                  style={{ 
                    padding: '5px 10px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => alert(`Mostrar detalles del item ${item.id}`)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de resumen de inventario */}
      <table border="1" cellPadding="5" style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th colSpan="4" style={{ padding: '10px', textAlign: 'center' }}>
              Resumen de Inventario de Recipientes
            </th>
          </tr>
          <tr>
            <th style={{ padding: '8px', width: '25%' }}>Recipiente</th>
            <th style={{ padding: '8px', width: '25%' }}>Total</th>
            <th style={{ padding: '8px', width: '25%' }}>Con Larvas</th>
            <th style={{ padding: '8px', width: '25%' }}>Tratados</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <React.Fragment key={`inventario-${item.id}`}>
              <tr>
                <td colSpan="4" style={{ 
                  padding: '8px', 
                  backgroundColor: '#e6f7ff',
                  fontWeight: 'bold'
                }}>
                  Vivienda #{item.numero} - {item.calle}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>Pilas</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.pilas.split('/')[0]}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.pilas.split('/')[2]}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.pilas.split('/')[3]}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>Bebederos</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.bebederos.split('/')[0]}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.bebederos.split('/')[2]}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.bebederos.split('/')[3]}</td>
              </tr>
              {/* Agrega más filas para otros recipientes según sea necesario */}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaItems;