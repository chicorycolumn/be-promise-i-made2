const axios = require('axios')

const fetchSongs = () => {
	const lyricsPromise = axios.get('https://nc-spotify.herokuapp.com/songs')
	//.catch(res.send({msg: "why does this break it when there was no error?"}))

	return lyricsPromise.then((rawSongsArray) => {return rawSongsArray})
	//
}


const fetchSongsByQuery = (truncatedUrl) => {
	const lyricsPromise = axios.get(`https://nc-spotify.herokuapp.com/songs${truncatedUrl}`)

	return lyricsPromise.then((filteredSongsArray) => {return filteredSongsArray})
}


const fetchSongById = (id) => {
	const lyricsPromise = axios.get(`https://nc-spotify.herokuapp.com/songs/${id}`)

	return lyricsPromise.then((specificSong) => {return specificSong})
}

const fetchLyricsByTitle = (title) => {
	formattedTitle = title.replace(/\s/g, "%20")

	console.log("heeyyyyyyyyyy here's formattedTitle", formattedTitle)

	const lyricsPromise = axios.get(`https://nc-spotify.herokuapp.com/songs?title=${formattedTitle}`) 
	
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
	.then(songDetails => {
		console.log(songDetails.data[0].id)
		return songDetails.data[0].id})

	return myPromise
}

const fetchAnalysisByID = (id) => {
	const myPromise = axios.get(`https://nc-spotify.herokuapp.com/analyses`)
	.then(allAnalyses => allAnalyses.data.filter(x => x.id === id))

	return myPromise
}

const fetchAlbumById = (id) => {
	const myPromise = axios.get(`https://nc-spotify.herokuapp.com/albums/${id}`)

	return myPromise
}

const updateSongDetails = (body, id) => {

	const myPromise = axios.patch(
		
		`https://nc-spotify.herokuapp.com/songs/${id}`, 
	
		{
		"id": this.id,
		"title": this.title,
		"artistId": this.artistId,
		"albumId": this.albumId,
		"chart_position": body.newPosition
		  }
		  
	).then(x => {
		return x.data})
	// .catch(err => {


	// 	if(! Object.keys(x).includes((Object.keys(body)[0]))){next()}



	// })

	return myPromise
}

module.exports = {fetchSongs, updateSongDetails, fetchAlbumById, fetchSongsByQuery, fetchSongById, fetchLyricsByTitle, fetchLyricsByID, fetchIdByTitle, fetchAnalysisByID}