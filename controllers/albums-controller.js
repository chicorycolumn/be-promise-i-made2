const {fetchAlbums, createNewAlbum} = require('../models/albums-model')

const getAlbums = (req, res, next) => {

    fetchAlbums().then((albums)=> {   
        
        const formattedAlbums = albums.data.map(alb => alb.title)
        
        res.send({albums: formattedAlbums})  
    
    })

}


const postNewAlbum = (req, res, next) => {

    const newAlbum = req.body

    if (newAlbum.title === undefined || newAlbum.artistId === undefined){
		res.status(400).send({msg: "This doesn't look like an album. Sorry!"})
	} else {

    createNewAlbum(req.body).then((newAlbum) => res.send({msg: "You created music!", albumYouCreated: newAlbum}))

    }

}




module.exports = {getAlbums, postNewAlbum}
