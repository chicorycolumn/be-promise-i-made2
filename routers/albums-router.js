const albumsRouter = require('express').Router()
const {getAlbums} = require('../controllers/albums-controller')

albumsRouter.get('/', getAlbums)

module.exports = albumsRouter
