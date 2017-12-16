const express           = require ( 'express' );
const bestivals          = express.Router();

const Bestival          = require ( '../models/bestivals.js' );


// INDEX
bestivals.get ( '/' , async ( req , res ) => {
  try {
    const bestivals = await Bestival.find();
    res.status( 200 ).json( bestivals );
  } catch ( error ) {
    res.status( 400 ).json({error : err.message});
  }
});

//CREATE
bestivals.post ( '/' , async ( req , res ) => {
  try {
    const newBestival = await Bestival.create( req.body );
    res.status( 200 ).json( newBestival );
  } catch ( error ) {
    res.status( 400 ).json({error : error.message});
  }
});

//DELETE
bestivals.delete ( '/:id' , async ( req , res ) => {
  try {
    const deleteBestival = await Bestival.findByIdAndRemove( req.params.id );
    res.status( 200 ).json( deleteBestival );
  } catch ( error ) {
    res.status( 400 ).json({error : error.message});
  }
});

//EDIT
bestivals.put ( '/:id' , async ( req , res ) => {
  try {
    const updateBestival = await Bestival.findByIdAndUpdate( req.params.id, req.body, { new : true } );
    res.status( 200 ).json( updateBestival );
  } catch ( error ) {
    res.status( 400 ).json({error : error.message});
  }
});

module.exports           = bestivals;
