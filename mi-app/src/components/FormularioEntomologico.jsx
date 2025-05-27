import React from 'react';

// Lista de tipos de recipientes
export const recipientesLista = [
  'Tanques',
  'Tambos',
  'Llantas',
  'Piletas',
  'Tinacos',
  'Inaccesibles',
  'Desechables',
  'Floreros',
  'Animales',
  'Diversos',
  'Grandes',
  'Ricos en sombra',
  'Otros',
];

// Estado inicial vacío
export const initialRecipientesState = recipientesLista.reduce((acc, tipo) => {
  acc[tipo] = { E: '', A: '', P: '', L: '' };
  return acc;
}, {});

const FormularioEntomologico = ({ recipientes, setRecipientes }) => {
  const handleChange = (tipo, campo, valor) => {
    if (isNaN(valor) || Number(valor) < 0) return;
    setRecipientes((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [campo]: valor,
      },
    }));
  };

  const handleResetTabla = () => {
    setRecipientes({ ...initialRecipientesState });
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(recipientes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipientes.json';
    a.click();
  };

  const handleAutocompletar = () => {
    const aleatorio = {};
    recipientesLista.forEach((tipo) => {
      aleatorio[tipo] = {
        E: Math.floor(Math.random() * 5),
        A: Math.floor(Math.random() * 5),
        P: Math.floor(Math.random() * 3),
        L: Math.floor(Math.random() * 10),
      };
    });
    setRecipientes(aleatorio);
  };

  // Calcular totales por columna
  const totales = ['E', 'A', 'P', 'L'].reduce((acc, campo) => {
    acc[campo] = recipientesLista.reduce((sum, tipo) => {
      const val = parseInt(recipientes?.[tipo]?.[campo]) || 0;
      return sum + val;
    }, 0);
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">E</th>
            <th className="p-2 border">A</th>
            <th className="p-2 border">P</th>
            <th className="p-2 border">L</th>
          </tr>
        </thead>
        <tbody>
          {recipientesLista.map((tipo) => (
            <tr key={tipo}>
              <td className="p-2 border font-medium">{tipo}</td>
              {['E', 'A', 'P', 'L'].map((campo) => (
                <td key={campo} className="p-1 border">
                  <input
                    type="number"
                    min="0"
                    value={recipientes?.[tipo]?.[campo] || ''}
                    onChange={(e) => handleChange(tipo, campo, e.target.value)}
                    className="w-16 border rounded px-1"
                    required
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-semibold">
            <td className="p-2 border">Total</td>
            {['E', 'A', 'P', 'L'].map((campo) => (
              <td key={campo} className="p-2 border text-center">{totales[campo]}</td>
            ))}
          </tr>
        </tfoot>
      </table>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleResetTabla}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Limpiar Tabla
        </button>
        <button
          onClick={handleAutocompletar}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Autocompletar (Prueba)
        </button>
        <button
          onClick={handleExportJSON}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Exportar JSON
        </button>
      </div>
    </div>
  );
};

export default FormularioEntomologico;

