//DEPENDENCIES
const express     = require('express');
const router      = express.Router();

//MODELS
const Festival    = require('../models/bestivals.js');
const Comments    = require('../models/comments.js')

//INDEX (GET ALL)
router.get('/', async (req, res) => {
try {
  const allFests = await Festival.find().populate("comment");
  res.status(200).json(allFests);
  console.log(allFests);
} catch (err) {
  res.status( 400 ).json({err : err.message})
}
});

//CREATE NEW
router.post('/', async (req, res) => {
  try {
    const newFest = await Festival.create(req.body);
    res.redirect('/');
    res.status(200).json(newFest);
    console.log(newFest);
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
});

//GET ONE
router.get ('/:id', async (req, res) => {
  try {
    const oneFest = await Festival.findById(req.params.id);
    const comments = await Comments.find({fest: oneFest._id});
    res.status(200).json(oneFest, comments);
    console.log(oneFest, comments);
  } catch (err) {
    res.status(400).json({err: err.message})
  }
});

//EDIT
router.get('/:id/editFest', async (req, res) => {
  try {
    const editFest = await Festival.findById(req.params.id);
    res.status(200).json(editFest);
    console.log(editFest);
  } catch (err) {
    res.status(400).json({err: err.message})
  }
});

//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updateFest = await Festival.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updateFest);
    console.log(updateFest);
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const removeFest = await Festival.findByIdAndRemove(req.params.id);
    //IMPLEMENT CASCADING DELETE HERE
    res.status(200).json(removeFest);
    console.log(removeFest);
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
});

//----------------------------------------------------
//EXPORTS
module.exports = router;
