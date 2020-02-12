const fetchAlbums = require('../models/albums-model')

const getAlbums = (req, res, next) => {

    fetchAlbums().then((albums)=> {   
        
        const formattedAlbums = albums.data.map(alb => alb.title)
        
        res.send({albums: formattedAlbums})  
    
    })

}

module.exports = {getAlbums}
