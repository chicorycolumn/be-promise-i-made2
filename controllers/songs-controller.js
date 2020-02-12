const fetchSongs = require("../models/songs-model");

const getSongs = (req, res, next) => {
  fetchSongs().then(allSongs => {
    let readySongs = [];

    if (Object.keys(req.query).length === 0) {
      readySongs = allSongs.data;
    } else if (req.query.albumId !== undefined) {
      readySongs = allSongs.data.filter(
        song => song.albumId === Number(req.query.albumId)
      );
    } else if (req.query.artistId !== undefined) {
      readySongs = allSongs.data.filter(
        song => song.albumId === Number(req.query.albumId)
      );
    }

    res.send({ songs: readySongs });
  });
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

module.exports = { getSongs };
