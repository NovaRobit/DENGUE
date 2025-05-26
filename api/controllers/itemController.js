const Item = require('../models/item');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los items.' });
  }
};

exports.createItem = async (req, res) => {
  const { nombre, descripcion, fecha } = req.body;

  if (!nombre || !descripcion || !fecha) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newItem = new Item({ nombre, descripcion, fecha });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar el item.' });
  }
};