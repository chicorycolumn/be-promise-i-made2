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

app.use(function(err, req, res, next) {
    if (err.status === 404) {
      res.status(404).send({ msg: 'ahhhhh this does not exist' });
    } else if (err.status === 400) {
        res.status(400).send({ msg: 'ahhhhh you entered bad data'});
    } else {
        res.status(500).send({ msg: 'ahhhhh some kind of error'})
    };
  });
  
    


module.exports = app // We export this so we can use it in the listen file.
