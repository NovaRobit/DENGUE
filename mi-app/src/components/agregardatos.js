import React, { useState } from 'react';
import axios from 'axios';

const MultiPaso = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    colonia: '',
    municipio: '',
    jurisdiccion: '',
    estado: '',
    fecha: '',
    casas_existentes: '',
    manzanas_existentes: '',
    habitantes: '',
    encuesta: '',
    verificacion: false,
    semana_epidemiologica: ''
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/items', formData);
      alert('✅ Datos guardados con éxito');
      console.log(response.data);
      setStep(2);
    } catch (error) {
      console.error('❌ Error al enviar los datos:', error);
      alert('❌ Ocurrió un error al guardar los datos');
    }
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ maxWidth: '1400px', margin: 'auto', padding: '20px' }}>

      {/* Título central */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ margin: 0 }}>FORMATO EXPLORACION ENTOMOLOGICA</h2>
      </div>

      {/* Contenedor de columnas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0px' }}>
        
        {/* Columna 1 - Formulario */}
        <div style={{ display: step === 1 ? 'block' : 'none' }}>
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Colonia o Localidad:</label>
            <input type="text" name="colonia" value={formData.colonia} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Municipio:</label>
            <input type="text" name="municipio" value={formData.municipio} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Jurisdicción:</label>
            <input type="text" name="jurisdiccion" value={formData.jurisdiccion} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Estado:</label>
            <input type="text" name="estado" value={formData.estado} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Fecha:</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Casas existentes:</label>
            <input type="number" name="casas_existentes" value={formData.casas_existentes} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Manzanas existentes:</label>
            <input type="number" name="manzanas_existentes" value={formData.manzanas_existentes} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Habitantes:</label>
            <input type="number" name="habitantes" value={formData.habitantes} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Tipo de Estudio:</label>
            <select name="encuesta" value={formData.encuesta} onChange={handleChange} style={inputStyle} required>
              <option value="">Seleccionar...</option>
              <option value="Verificacion">Verificación</option>
              <option value="Encuesta">Encuesta</option>
            </select>

            <label style={labelStyle}>Semana Epidemiológica:</label>
            <input type="number" name="semana_epidemiologica" value={formData.semana_epidemiologica} onChange={handleChange} style={inputStyle} required />

            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Guardar</button>
          </form>
        </div>

        {/* Columna 2 - Recipientes */}
        <div style={{ display: step === 2 ? 'block' : 'none' }}>
          <h2>Agregar Recipientes</h2>
          <p>Aquí irán los campos de recipientes...</p>
          <button onClick={() => setStep(3)} style={{ padding: '10px 20px', fontSize: '16px' }}>Siguiente</button>
        </div>

        {/* Columna 3 - Resumen */}
        <div style={{ display: step === 3 ? 'block' : 'none' }}>
          <h2>Resumen Final</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <button onClick={() => setStep(1)} style={{ padding: '10px 20px', fontSize: '16px' }}>Reiniciar</button>
        </div>
      </div>
    </div>
  );
};

export default MultiPaso;
