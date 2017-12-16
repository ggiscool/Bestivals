const express = require('express');
const router = express.Router();

const Bestival    = require('../models/bestivals.js');


//INDEX
router.get('/', async (req, res) => {
  const bestival = await Bestival.find().populate('user');
  res.status(200).json(bestival);
});


//CREATE
router.post('/', async (req, res) => {
  try {
    const bestival = await Bestival.create(req.body);
    res.status(200).json(bestival);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});


//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const bestival = await Bestival.findByIdAndRemove(req.params.id);
    res.status(200).json(bestival);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const bestival = await Bestival.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(bestival);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
