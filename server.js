const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB local
mongoose.connect('mongodb://localhost:27017/dengueDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Definir esquema de datos CORRECTO
const itemSchema = new mongoose.Schema({
  colonia: String,
  municipio: String,
  jurisdiccion: String,
  estado: String,
  fecha: Date,
  casas_existentes: Number,
  manzanas_existentes: Number,
  habitantes: Number,
  encuesta: String,
  verificacion: Boolean,
  semana_epidemiologica: Number
}, { collection: 'items' });

const Item = mongoose.model('Item', itemSchema);

// Rutas API
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los datos' });
  }
});
app.delete('/api/items/:id', async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ mensaje: 'Item no encontrado' });
    res.json({ mensaje: 'Item eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el item' });
  }
});


app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el item' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const nuevoItem = new Item(req.body);
    await nuevoItem.save();
    res.status(201).json(nuevoItem);
  } catch (error) {
    console.error('❌ Error al guardar el item:', error);
    res.status(400).json({ mensaje: 'Error al guardar el item' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
