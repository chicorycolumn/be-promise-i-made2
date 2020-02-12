const axios = require('axios')

const fetchSongs = () => {
	const lyricsPromise = axios.get('https://nc-spotify.herokuapp.com/songs')

	return lyricsPromise.then((rawSongsArray) => {return rawSongsArray})
}

module.exports = fetchSongs