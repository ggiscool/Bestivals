
const express     = require("express");
const router      = express.Router();

//MODELS
const Bestival       = require('../models/bestivals.js');
const Comments    = require('../models/comments.js');


//INDEX ROUTE
router.get('/', async (req, res) => {
  const allComments = await Comments.find().populate("fest");
  res.send(allComments);
});

//CREATE ROUTE
router.post('/edit/', async (req, res) => {
  try {
    const createComment = await Comments.create(req.body);
    res.status( 200 ).json( createComment );
  } catch ( error ) {
    console.log(err);
    res.status( 400 ).json({error : error.message});
  }
});

//SHOW ROUTE
router.get('/:id', async (req, res) => {
  const oneFest = await Bestival.findById(req.params.id);
  const comments = await Comments.find({fest: oneFest._id});
  res.send("/public/comments.html", {oneFest, comments});
});

//UPDATE (PUT) ROUTE
router.put('/:id', async (req, res) => {
  try {
    const updateComment = await Comments.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const removeComment = await Comments.findByIdAndRemove(req.params.id);
    res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//----------------------------------------------------
//EXPORTS
module.exports = router;
