const axios = require('axios')

const fetchAlbums = () => {
	const lyricsPromise = axios.get('https://nc-spotify.herokuapp.com/albums')

	return lyricsPromise.then((rawAlbumArray) => {return rawAlbumArray})
}

module.exports = fetchAlbums