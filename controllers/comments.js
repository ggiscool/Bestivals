//DEPENDENCIES
const express     = require("express");
const router      = express.Router();

//MODELS
const Festival    = require('../models/bestivals.js');
const Comments    = require('../models/comments.js');

//INDEX
router.get('/', async (req, res) => {
  try {
    const allComms = await Comments.find().populate("fest");
    res.status(200).json(allComms);
    console.log(allComms);
  } catch (err) {
    res.status(400).json({err : err.message})
}
});

//CREATE COMMENT
router.post('/', async (req, res) => {
  try {
    const createComm = await Comments.create(req.body);
    res.status(200).json(createComm);
    console.log(createComm);
  } catch (err) {
    res.status(400).json({err : err.message});
  }
});

//EDIT
router.get('/:id/editComm', async (req, res) => {
  try {
    const editComm = await Comments.findById(req.params.id);
    res.status(200).json(editComm);
    console.log(editComm);
  } catch (err) {
    res.status(400).json({err: err.message})
  }
});

//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updateComm = await Comments.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updateComm);
    console.log(updateComm);
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const removeComm = await Comments.findByIdAndRemove(req.params.id);
    res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//----------------------------------------------------
//EXPORTS
module.exports = router;
