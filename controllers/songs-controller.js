const {fetchSongs, fetchSongsByQuery, fetchSongById, fetchLyricsByID, fetchIdByTitle, fetchAnalysisByID} = require("../models/songs-model");

const getSongs = (req, res, next) => {

  if (Object.keys(req.query).length === 0){

  fetchSongs().then(allSongs => {
    let readySongs = allSongs.data;
    // console.log("queryyyyyyyyyyyyyyyyy")
    // console.log(req.query)

    // 
    //     readySongs = 
    // }

    // if (Object.keys(req.query).length === 0) {
    //   readySongs = allSongs.data;
    // } else if (req.query.albumId !== undefined) {
    //   readySongs = allSongs.data.filter(
    //     song => song.albumId === Number(req.query.albumId)
    //   );
    // } else if (req.query.artistId !== undefined) {
    //   readySongs = allSongs.data.filter(
    //     song => song.albumId === Number(req.query.albumId)
    //   );
    // }

    res.send({ songs: readySongs });
  });


} else {

    fetchSongsByQuery(req.url).then(queriedSongs => {
        let readySongs = queriedSongs.data
        res.send({ songs: readySongs });
    })




}


};

// const fetchLyrics = require...from models...

// const sendLyrics = (req, res) => {
// 	const {artist, song} = req.query
// 	fetchLyrics(artist, song)
// 		.then((lyrics) => {
// 	res.status(200).send({lyrics})
// })

// }
// module.exports = {sendLyrics}

const getSongById = (req, res, next) => {
    fetchSongById(req.url).then((specificSong)=>{
        res.send({song: specificSong.data})
    }).catch((err) => {res.status(404).send({msg: 'Song not found'})})

}

const getLyricsByTitle = (req, res, next) => {

    fetchIdByTitle(req.params.title)
    .then((id) => fetchLyricsByID(id).then(lyrics => res.send({lyrics: lyrics})))

}

const getAnalysisByTitle = (req, res, next) => {
    
    fetchIdByTitle(req.params.title)
    .then((id) => fetchAnalysisByID(id).then(anal => res.send({analysis: anal})))

    // fetchSongById(req.url).then((specificSong)=>{
    //     res.send({song: specificSong.data})
    // })

}



module.exports = { getSongs, getSongById, getLyricsByTitle, getAnalysisByTitle };
