const songsRouter = require('express').Router()
const {getSongs, patchSong, getSongById, getLyricsByTitle, getAnalysisByTitle} = require('../controllers/songs-controller')

songsRouter.get('/', getSongs)
songsRouter.get('/:id', getSongById)
songsRouter.patch('/:id', patchSong)
songsRouter.get('/lyrics/:title', getLyricsByTitle)
songsRouter.get('/analysis/:title', getAnalysisByTitle)


module.exports = songsRouter
