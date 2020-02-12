const axios = require('axios')

const fetchSongs = () => {
	const lyricsPromise = axios.get('https://nc-spotify.herokuapp.com/songs')

	return lyricsPromise.then((rawSongsArray) => {return rawSongsArray})
}


const fetchSongsByQuery = (truncatedUrl) => {
	const lyricsPromise = axios.get(`https://nc-spotify.herokuapp.com/songs${truncatedUrl}`)

	return lyricsPromise.then((filteredSongsArray) => {return filteredSongsArray})
}


const fetchSongById = (truncatedUrl) => {
	const lyricsPromise = axios.get(`https://nc-spotify.herokuapp.com/songs${truncatedUrl}`)

	return lyricsPromise.then((specificSong) => {return specificSong})
}

//THIS IS WHERE WE GOT TO

const fetchLyricsByTitle = (title) => {
	formattedTitle = title.replace(/\s/g, "%20")

	console.log(formattedTitle)

	const lyricsPromise = axios.get(`https://nc-spotify.herokuapp.com/songs/${formattedTitle}`) //NOT THIS, INSTEAD YOU GOTTA FIND THE SONG BY TITLE AND THEN ID TO GET THE LYRICS

	return lyricsPromise.then((specificSong) => {return specificSong})

}


module.exports = {fetchSongs, fetchSongsByQuery, fetchSongById, fetchLyricsByTitle}