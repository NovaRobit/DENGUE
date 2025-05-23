const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ruta al archivo JSON
const DATA_PATH = path.join(__dirname, 'db', 'data.json');

// Leer datos del archivo con manejo de errores
function leerDatos() {
  try {
    const rawData = fs.readFileSync(DATA_PATH, 'utf8');
    if (!rawData.trim()) return [];
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error leyendo el archivo JSON:", error);
    return [];
  }
}

// Ruta para obtener todos los registros
app.get('/items', (req, res) => {
  const datos = leerDatos();
  res.json(datos);
});

// Ruta para obtener un ítem por su número
app.get('/items/:numero', (req, res) => {
  const datos = leerDatos();
  const numero = parseInt(req.params.numero);
  const item = datos.find(d => d.numero === numero);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ mensaje: 'Elemento no encontrado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
