const albumsRouter = require('express').Router()
const {getAlbums, postNewAlbum} = require('../controllers/albums-controller')

albumsRouter.get('/', getAlbums)
albumsRouter.post('/', postNewAlbum)

module.exports = albumsRouter
