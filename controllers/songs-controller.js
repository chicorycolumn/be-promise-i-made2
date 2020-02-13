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
    
    if (/^\d+$/.test(req.params.id)){
    
    
    fetchSongById(req.params.id).then((specificSong)=>{
        res.send({song: specificSong.data})
    }).catch((err) => {res.status(404).send({msg: 'Oh no! Song not found'})})


    } else {

        fetchIdByTitle(req.params.id)
        .then((id) => {fetchSongById(id).then((specificSong)=>{
            res.send({song: specificSong.data})
        }).catch((err) => {res.status(404).send({msg: 'Oh no! Song not found'})})})

    }
}

const getLyricsByTitle = (req, res, next) => {

    console.log("yooooooooooooooooooooooooooooooo", req.params.title)

    fetchIdByTitle(req.params.title)
    .then((id) => Promise.all([fetchSongById(id), fetchLyricsByID(id)])
    .then((arr) => res.send({song: arr[0].data, lyrics: arr[1]})))
    .catch((err) => {res.status(404).send({msg: 'Oh no! Song not found'})})

    // .then((id) => Promise.all([fetchAnalysisByID(id), fetchLyricsByID(id)])
    // .then(arr => res.send({analysis: arr[0][0], lyrics: arr[1]})))
    // .catch((err) => {res.status(404).send({msg: 'Oh no! Song not found'})})
    

    // fetchIdByTitle(req.params.title)
    // .then((id) => fetchLyricsByID(id).then(lyrics => res.send({lyrics: lyrics})))
    // .catch((err) => {res.status(404).send({msg: 'Oh noo! Song not found'})})

}

const getAnalysisByTitle = (req, res, next) => {
    
    fetchIdByTitle(req.params.title)
    .then((id) => Promise.all([fetchAnalysisByID(id), fetchLyricsByID(id)])
    .then(arr => res.send({analysis: arr[0][0], lyrics: arr[1]})))
    .catch((err) => {res.status(404).send({msg: 'Oh no! Song not found'})})
    
    // fetchIdByTitle(req.params.title)
    // .then((id) => fetchAnalysisByID(id).then(anal => res.send({analysis: anal})))
    // .catch((err) => {res.status(404).send({msg: 'Oh nooo! Song not found'})})

    // // fetchSongById(req.url).then((specificSong)=>{
    // //     res.send({song: specificSong.data})
    // // })

}





module.exports = { getSongs, getSongById, getLyricsByTitle, getAnalysisByTitle };
