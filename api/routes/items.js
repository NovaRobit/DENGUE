const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// POST: crear nuevo item
router.post('/', async (req, res) => {
  try {
    const nuevoItem = new Item(req.body);
    await nuevoItem.save();
    res.status(201).json(nuevoItem);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al guardar el item', error: err.message });
  }
});

module.exports = router;