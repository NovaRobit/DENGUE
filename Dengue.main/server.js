const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { log } = require('console');

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
  console.log(datos);
  
  res.json(datos);
});

// Ruta para obtener un ítem por su número
app.get('/items/:id', (req, res) => {
  const id = req.params.id;
  console.log('[DEBUG] ID recibido en backend:', id);

  const datos = leerDatos(); // Usar la función que ya tienes definida
  console.log('[DEBUG] Datos leídos:', datos);

  // Buscar el ítem (convertir id a número para comparar)
  const item = datos.find(i => i.id === Number(id));
  
  if (item) {
    console.log('[DEBUG] Item encontrado:', item);
    res.json(item);
  } else {
    console.log('[DEBUG] Item no encontrado para ID:', id);
    res.status(404).json({ mensaje: 'Item no encontrado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
