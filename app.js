const express = require('express')
const albumsRouter = require('./routers/albums-router')
const songsRouter = require('./routers/songs-router')
const axios = require('axios')


const app = express()
app.use(express.json())



app.use('/songs', songsRouter)
app.use('/albums', albumsRouter)
// app.use('/artists', _____Router)
// app.use('/lyrics', _____Router)
// app.use('/analyses', _____Router)
// app.use('/db', _____Router)

module.exports = app // We export this so we can use it in the listen file.
