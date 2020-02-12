const fetchSongs = require('../models/songs-model')

const getSongs = (req, res, next) => {

    if (Object.keys(req.query).length === 0){

    fetchSongs().then((songs)=> {   
        //console.log(songs)
        res.send({songs: songs.data})  
    
    })

    } else {
        
    }

}


// const fetchLyrics = require...from models...

// const sendLyrics = (req, res) => {
// 	const {artist, song} = req.query
// 	fetchLyrics(artist, song)
// 		.then((lyrics) => {
// 	res.status(200).send({lyrics})
// })

// }
// module.exports = {sendLyrics}


module.exports = {getSongs}
