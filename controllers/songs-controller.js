const fetchSongs = require('../models/songs-model')

const getSongs = (req, res, next) => {

    fetchSongs().then((allSongs)=> {   
        console.log(req.query.albumId)
        let readySongs = []
console.log(1000)
        if (Object.keys(req.query).length === 0){readySongs = allSongs.data;  console.log(2000)}
       
        else if (req.query.albumId !== undefined){readySongs = allSongs.data.filter(song => song.albumId === req.query.albumId); console.log(2500)}
        console.log(3000)


        res.send({songs: readySongs})  
    
    })
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
