const songsRouter = require('express').Router()
const {getSongs, getSongById, getLyricsByTitle} = require('../controllers/songs-controller')

songsRouter.get('/', getSongs)
songsRouter.get('/:id', getSongById)
songsRouter.get('/lyrics/:title', getLyricsByTitle)


module.exports = songsRouter
