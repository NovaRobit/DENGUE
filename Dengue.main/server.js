const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Ruta absoluta al archivo JSON en la carpeta db
const DATA_PATH = path.join(__dirname, 'db', 'data.json');

// Middleware para leer JSON del cuerpo de la solicitud
app.use(bodyParser.json());

// Leer datos del archivo
function leerDatos() {
  const datos = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(datos);
}

// Guardar datos en el archivo
function guardarDatos(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET /items - obtener todos los elementos
app.get('/items', (req, res) => {
  const datos = leerDatos();
  res.json(datos);
});

// GET /items/:id - obtener un elemento por ID
app.get('/items/:id', (req, res) => {
  const datos = leerDatos();
  const item = datos.find(d => d.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ mensaje: 'Elemento no encontrado' });
});

// POST /items - agregar un nuevo elemento
app.post('/items', (req, res) => {
  const datos = leerDatos();
  const nuevo = req.body;

  if (!nuevo.nombre) {
    return res.status(400).json({ mensaje: 'El campo "nombre" es obligatorio' });
  }

  nuevo.id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1;
  datos.push(nuevo);
  guardarDatos(datos);
  res.status(201).json(nuevo);
});

// PUT /items/:id - actualizar un elemento
app.put('/items/:id', (req, res) => {
  const datos = leerDatos();
  const id = parseInt(req.params.id);
  const index = datos.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Elemento no encontrado' });
  }

  const actualizado = { ...datos[index], ...req.body, id };
  datos[index] = actualizado;
  guardarDatos(datos);
  res.json(actualizado);
});

// DELETE /items/:id - eliminar un elemento
app.delete('/items/:id', (req, res) => {
  const datos = leerDatos();
  const id = parseInt(req.params.id);
  const filtrados = datos.filter(d => d.id !== id);

  if (datos.length === filtrados.length) {
    return res.status(404).json({ mensaje: 'Elemento no encontrado' });
  }

  guardarDatos(filtrados);
  res.json({ mensaje: 'Elemento eliminado correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
