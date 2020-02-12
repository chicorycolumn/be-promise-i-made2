const songsRouter = require('express').Router()
const {getSongs} = require('../controllers/songs-controller')

songsRouter.get('/', getSongs)


module.exports = songsRouter
