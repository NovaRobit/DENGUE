import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DetalleItem({ id }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`http://localhost:3000/items/${id}`)
      .then(response => {
        setItem(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.mensaje || err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Detalle del Item #{item.id}</h2>

      <table border="1" cellPadding="5" style={{ marginBottom: '20px' }}>
        <thead>
          <tr><th>Campo</th><th>Valor</th></tr>
        </thead>
        <tbody>
          <tr><td>Número</td><td>{item.numero}</td></tr>
          <tr><td>Calle</td><td>{item.calle}</td></tr>
          <tr><td>Habitantes</td><td>{item.habitantes}</td></tr>
          <tr><td>Manzana</td><td>{item.manzana}</td></tr>
          <tr><td>Sector</td><td>{item.sector}</td></tr>
        </tbody>
      </table>

      <table border="1" cellPadding="5" style={{ marginBottom: '20px' }}>
        <thead>
          <tr><th>Inventario</th><th>Cantidad</th></tr>
        </thead>
        <tbody>
          <tr><td>Pilas</td><td>{item.pilas}</td></tr>
          <tr><td>Bebederos</td><td>{item.bebederos}</td></tr>
          <tr><td>Tanques</td><td>{item.tanques}</td></tr>
          <tr><td>Llantas</td><td>{item.llantas}</td></tr>
          <tr><td>Lote Baldío</td><td>{item.lote_baldio}</td></tr>
          <tr><td>Pozos</td><td>{item.pozos}</td></tr>
          <tr><td>Macetas</td><td>{item.macetas}</td></tr>
          <tr><td>Chicos</td><td>{item.chicos}</td></tr>
          <tr><td>Tinacos</td><td>{item.tinacos}</td></tr>
          <tr><td>Cubetas</td><td>{item.cubetas}</td></tr>
          <tr><td>Cisternas</td><td>{item.cisternas}</td></tr>
          <tr><td>Floreros</td><td>{item.floreros}</td></tr>
          <tr><td>Baños</td><td>{item.banos}</td></tr>
        </tbody>
      </table>

      <p><strong>Positivos Totales:</strong> {item.positivos_totales}</p>
    </div>
  );
}

export default DetalleItem;
