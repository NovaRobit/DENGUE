import React, { useState } from 'react';
import axios from 'axios';
import FormularioEntomologico, { initialRecipientesState } from '../components/FormularioEntomologico';

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
    TipodeEstudio: '',
    semana_epidemiologica: ''
  });

  const [recipientes, setRecipientes] = useState(initialRecipientesState);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const autocompletarGenerales = () => {
    setFormData({
      colonia: 'Col. Primavera',
      municipio: 'Villa del Sol',
      jurisdiccion: 'Jurisdicción 2',
      estado: 'Nuevo León',
      fecha: new Date().toISOString().split('T')[0],
      casas_existentes: '25',
      manzanas_existentes: '5',
      habitantes: '123',
      TipodeEstudio: 'Encuesta',
      semana_epidemiologica: '21'
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      alert('✅ Datos del paso 1 guardados con éxito');
      setStep(2);
    } catch (error) {
      console.error('❌ Error al enviar los datos del paso 1:', error);
      alert('❌ Ocurrió un error');
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const fullData = {
        ...formData,
        recipientes
      };

      const response = await axios.post('http://localhost:3000/api/items', fullData);
      alert('✅ Todos los datos fueron guardados correctamente');
      console.log(response.data);
      setStep(1);
      setFormData({
        colonia: '',
        municipio: '',
        jurisdiccion: '',
        estado: '',
        fecha: '',
        casas_existentes: '',
        manzanas_existentes: '',
        habitantes: '',
        TipodeEstudio: '',
        semana_epidemiologica: ''
      });
      setRecipientes(initialRecipientesState);
    } catch (err) {
      console.error(err);
      alert('❌ Error al guardar todos los datos');
    }
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px'
  };

  const labelStyle = {
    fontWeight: 'bold'
  };
  const headerCellStyle = {
  padding: '10px',
  backgroundColor: '#e0e0e0',
  fontWeight: 'bold',
  border: '1px solid #ccc',
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ccc',
};


  return (
    <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ margin: 0 }}>FORMATO EXPLORACION ENTOMOLOGICA</h2>
      </div>

      {/* Paso 1 */}
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            {[
              { label: 'Colonia o Localidad', name: 'colonia', type: 'text' },
              { label: 'Municipio', name: 'municipio', type: 'text' },
              { label: 'Jurisdicción', name: 'jurisdiccion', type: 'text' },
              { label: 'Estado', name: 'estado', type: 'text' },
              { label: 'Fecha', name: 'fecha', type: 'date' },
              { label: 'Casas existentes', name: 'casas_existentes', type: 'number' },
              { label: 'Manzanas existentes', name: 'manzanas_existentes', type: 'number' },
              { label: 'Habitantes', name: 'habitantes', type: 'number' },
              {
                label: 'Tipo de Estudio',
                name: 'TipodeEstudio',
                type: 'select',
                options: ['Verificacion', 'Encuesta']
              },
              { label: 'Semana Epidemiológica', name: 'semana_epidemiologica', type: 'number' }
            ].map(field => (
              <div key={field.name}>
                <label style={labelStyle}>{field.label}:</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  >
                    <option value="">Seleccionar...</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              type="button"
              onClick={autocompletarGenerales}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                marginRight: '10px',
                backgroundColor: '#facc15',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              Autocompletar (prueba)
            </button>

            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
              Guardar
            </button>
          </div>
        </form>
      )}

{/* Paso 2 */}
{step === 2 && (
  <div style={{ textAlign: 'center' }}>
    <h2>Agregar Recipientes</h2>
    <div
      style={{
        margin: '0 auto',
        maxWidth: '1200px',
        textAlign: 'left',
        overflowX: 'auto', // permite ver la columna L si fuera necesario
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px'
      }}
    >
      <FormularioEntomologico recipientes={recipientes} setRecipientes={setRecipientes} />
    </div>
    <button
      onClick={() => setStep(3)}
      style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}
    >
      Siguiente
    </button>
  </div>
)}

      {/* Paso 3 */}
  {step === 3 && (
  <div>
    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Resumen Final</h2>

    {/* Tabla de resumen de recipientes */}
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px'
    }}>
      <thead>
        <tr>
          <th colSpan="5" style={{
            padding: '15px',
            textAlign: 'center',
            backgroundColor: '#007BFF',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
          }}>
            Resumen de Inventario de Recipientes (reales)
          </th>
        </tr>
        <tr>
          <th style={headerCellStyle}>Recipiente</th>
          <th style={headerCellStyle}>E</th>
          <th style={headerCellStyle}>A</th>
          <th style={headerCellStyle}>P</th>
          <th style={headerCellStyle}>L</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(recipientes).map(([tipo, datos]) => (
          <tr key={tipo} style={{
            borderBottom: '1px solid #ccc',
            textAlign: 'center'
          }}>
            <td style={cellStyle}>{tipo}</td>
            <td style={cellStyle}>{datos?.E || 0}</td>
            <td style={cellStyle}>{datos?.A || 0}</td>
            <td style={cellStyle}>{datos?.P || 0}</td>
            <td style={cellStyle}>{datos?.L || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ textAlign: 'center' }}>
      <button
        onClick={handleFinalSubmit}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#facc15',
          marginRight: '10px',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Guardar
      </button>
      <button
        onClick={() => setStep(1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#facc15',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Reiniciar
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default MultiPaso;

