const songsRouter = require('express').Router()
const {getSongs, getSongById, getLyricsByTitle, getAnalysisByTitle} = require('../controllers/songs-controller')

songsRouter.get('/', getSongs)
songsRouter.get('/:id', getSongById)
songsRouter.get('/lyrics/:title', getLyricsByTitle)
songsRouter.get('/analysis/:title', getAnalysisByTitle)


module.exports = songsRouter
