const mongoose = require('mongoose');

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
  TipodeEstudio:{
     type: String,
    enum: ['Encuesta', 'Verificacion'], 
    required: true
  },
  semana_epidemiologica: Number,
  // Los campos que ya tenías antes (opcional según si usas estos datos):
  numero: String,
  calle: String,
  positivos_totales: Number,
  manzana: String,
  sector: String,
  pilas: String,
  bebederos: String,
  // ...otros recipientes si los agregaste
});

module.exports = mongoose.model('Item', ItemSchema);
