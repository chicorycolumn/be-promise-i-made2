const axios = require('axios')
const fs = require('fs');

const fetchAlbums = () => {
	const lyricsPromise = axios.get('https://nc-spotify.herokuapp.com/albums')

	return lyricsPromise.then((rawAlbumArray) => {return rawAlbumArray})
}

const createNewAlbum = (newAlbum) => {

	let timestamp = new Date().getTime()
	newAlbum.id = timestamp
	newAlbum.added = true

	const myPromise = axios.post('https://nc-spotify.herokuapp.com/albums', newAlbum)
	.then(()=>{return newAlbum})

	return myPromise

}

module.exports = {fetchAlbums, createNewAlbum}