const {fetchSongs, updateSongDetails, fetchSongsByQuery, fetchAlbumById, fetchSongById, fetchLyricsByID, fetchIdByTitle, fetchAnalysisByID} = require("../models/songs-model");

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


//GET SONG BY ID - LEAN VERSION
const getSongById = (req, res, next) => {

    fetchSongById(req.params.id).then((songDetails)=>{
        
        const modifiedSongDetails = {...songDetails.data}
        return modifiedSongDetails
    })
    .then(modifiedSongDetails => {

        const albumId = modifiedSongDetails.albumId

        return Promise.all([fetchAlbumById(albumId), modifiedSongDetails]) // NECESSARY TO RETURN THE RESULT ARR! So can use in next then block.
    })
    .then(arr => {

        const albumTitle = arr[0].data.title

        modifiedSongDetails = arr[1]

        modifiedSongDetails.album = albumTitle
        delete modifiedSongDetails.albumId

        res.send({"song details AND album name": modifiedSongDetails})
    })   
    .catch((err) => {
        console.log(err)
        res.status(404).send({msg: 'Oh no! Song not found'})
    })
}






//GET SONG BY ID - LEGACY VERSION
// const getSongById = (req, res, next) => {
    
//     if (/^\d+$/.test(req.params.id)){ // this is extra bit i put to check if id entered was number or title

//     fetchSongById(req.params.id).then((songDetails)=>{
        
//         const modifiedSongDetails = {...songDetails.data}
//         return modifiedSongDetails
//         // const albumId = modifiedSongDetails.albumId
//         // console.log(modifiedSongDetails, albumId)
//         // const carryForward = [modifiedSongDetails, albumId]
//         // return carryForward
//     })

//     // .then(carryForward => {
//     .then(modifiedSongDetails => {
        
//         console.log("smello")

//         const albumId = modifiedSongDetails.albumId
//         // const albumId = carryForward[1]
//         // const modifiedSongDetails = carryForward[0]

//         Promise.all([fetchAlbumById(albumId), modifiedSongDetails]).then(arr => {
        
        
//             const albumTitle = arr[0].data.title

//             modifiedSongDetails.album = albumTitle
//             delete modifiedSongDetails.albumId

//             res.send({"song details AND album name": modifiedSongDetails})
        
//         })
    
//     })   
 
    
//     .catch((err) => {res.status(404).send({msg: 'Oh no! Song not found'})})
//     }
//         // modifiedSongDetails.album = //get the album name via the ID, but async!
        
//         // delete modifiedSongDetails.albumId

//         // return res.send({song: modifiedSongDetails})



//     // } else { // meant to be same code repeated, mostly, but if title rather than number id.

//     //     fetchIdByTitle(req.params.id)
//     //     .then((id) => {fetchSongById(id).then((specificSong)=>{
//     //         res.send({song: specificSong.data})
//     //     }).catch((err) => {res.status(404).send({msg: 'Oh no! Song not found'})})})

//     // }
// }

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


const patchSong = (req, res, next) => {
    console.log(23234234324, req.params.id)
    updateSongDetails(req.body, req.params.id).then(x => res.send(x))
}




module.exports = { getSongs, patchSong, getSongById, getLyricsByTitle, getAnalysisByTitle };
