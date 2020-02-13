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

	console.log("heeyyyyyyyyyy here's formattedTitle", formattedTitle)

	const lyricsPromise = axios.get(`https://nc-spotify.herokuapp.com/songs?title=${formattedTitle}`) 
	//NOT THIS, INSTEAD YOU GOTTA FIND THE SONG BY TITLE AND THEN ID TO GET THE LYRICS

	return lyricsPromise.then((x) => {return x.data})

}


const fetchLyricsByID = (id) => {
	const myPromise = axios.get(`https://nc-spotify.herokuapp.com/lyrics/${id}`)
	.then(lyricsObject => lyricsObject.data.lyrics)

	return myPromise
}


const fetchIdByTitle = (title) => {
	formattedTitle = title.replace(/\s/g, "%20")
	console.log(formattedTitle)
	const myPromise = axios.get(`https://nc-spotify.herokuapp.com/songs?title=${formattedTitle}`)
	.then(songDetails => songDetails.data[0].id)

	return myPromise
}

const fetchAnalysisByID = (id) => {
	const myPromise = axios.get(`https://nc-spotify.herokuapp.com/analyses`)
	.then(allAnalyses => allAnalyses.data.filter(x => x.id === id))

	return myPromise
}

module.exports = {fetchSongs, fetchSongsByQuery, fetchSongById, fetchLyricsByTitle, fetchLyricsByID, fetchIdByTitle, fetchAnalysisByID}