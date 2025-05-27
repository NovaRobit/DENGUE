const mongoose = require('mongoose');

const recipienteSchema = new mongoose.Schema({
  E: { type: String, default: '' },
  A: { type: String, default: '' },
  P: { type: String, default: '' },
  L: { type: String, default: '' }
}, { _id: false });

const recipientesSchema = new mongoose.Schema({
  Tanques: recipienteSchema,
  Tambos: recipienteSchema,
  Llantas: recipienteSchema,
  Piletas: recipienteSchema,
  Tinacos: recipienteSchema,
  Inaccesibles: recipienteSchema,
  Desechables: recipienteSchema,
  Floreros: recipienteSchema,
  Animales: recipienteSchema,
  Diversos: recipienteSchema,
  Grandes: recipienteSchema,
  'Ricos en sombra': recipienteSchema,
  Otros: recipienteSchema
}, { _id: false });

const ItemSchema = new mongoose.Schema({
  colonia: String,
  municipio: String,
  jurisdiccion: String,
  estado: String,
  fecha: Date,
  casas_existentes: Number,
  manzanas_existentes: Number,
  habitantes: Number,
  encuesta: String,
  TipodeEstudio: {
    type: String,
    enum: ['Encuesta', 'Verificacion'],
    required: true
  },
  semana_epidemiologica: Number,

  // Datos opcionales adicionales
  numero: String,
  calle: String,
  positivos_totales: Number,
  manzana: String,
  sector: String,
  pilas: String,
  bebederos: String,

  // Aquí van todos los recipientes agrupados
  recipientes: recipientesSchema
});

module.exports = mongoose.model('Item', ItemSchema);
