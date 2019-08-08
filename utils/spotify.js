const {
  songDatabase: { songs },
  // NOTE: not destructuring albums off database so test can reset the array using reference
  albumDatabase,
  lyricDatabase: { lyrics },
  analysesDatabase: { analyses }
} = require('../data/spotify-database');

exports.requestAllSongs = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const songsResponse = {
        data: {
          songs: [...songs.map(song => ({ ...song }))]
        },
        status: 200
      };
      resolve(songsResponse);
    }, Math.random() * 200);
  });
};

exports.requestSongByTitle = requestedSongTitle => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!requestedSongTitle) {
        return reject({
          status: 400,
          data: { msg: 'you must pass a song title to request a track' }
        });
      }
      const songFound = songs.find(song => {
        return song.title.toLowerCase() === requestedSongTitle.toLowerCase();
      });
      if (songFound) {
        const songResponse = {
          data: {
            song: { ...songFound }
          },
          status: 200
        };
        resolve(songResponse);
      } else {
        reject({
          status: 404,
          data: { msg: `couldn't find ${requestedSongTitle}` }
        });
      }
    }, Math.random() * 200);
  });
};

exports.requestSongLyrics = requestedSongTitle => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const songExists = lyrics.hasOwnProperty(requestedSongTitle);
      if (songExists) {
        const lyricResponse = {
          data: {
            lyrics: lyrics[requestedSongTitle]
          },
          status: 200
        };
        resolve(lyricResponse);
      } else {
        reject({
          status: requestedSongTitle ? 404 : 400,
          data: {
            msg: requestedSongTitle
              ? `sorry ${requestedSongTitle} doesn't exist...`
              : 'you must pass a song title to request lyrics'
          }
        });
      }
    }, Math.random() * 200);
  });
};

exports.getSongAnalysis = lyrics => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!lyrics)
        reject({
          status: 400,
          data: {
            msg: 'you must pass some song lyrics to request an analysis'
          }
        });
      const songExists = analyses.hasOwnProperty(lyrics);
      if (songExists) {
        const analysisResponse = {
          data: {
            analysis: analyses[lyrics]
          },
          status: 200
        };
        resolve(analysisResponse);
      } else {
        reject({
          status: 404,
          data: {
            msg: `sorry we dont have analysis on that song... or maybe that those long lyrics are incorrect? ...`
          }
        });
      }
    }, Math.random() * 200);
  });
};

exports.getAlbums = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const albumResponse = {
        data: {
          albums: [...albumDatabase.albums]
        },
        status: 200
      };
      resolve(albumResponse);
    }, Math.random() * 200);
  });
};

exports.postAlbum = title => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const alreadyExists = albumDatabase.albums.includes(title);
      if (alreadyExists) {
        reject({
          status: 422,
          data: { msg: `Unprocessible entity - album ${title} already exists` }
        });
      } else if (typeof title !== 'string' || !title) {
        reject({
          status: 400,
          data: {
            msg: !title
              ? 'Bad Request - you must pass an album title to post an album'
              : `Bad Request - album titles must be strings`
          }
        });
      } else {
        albumDatabase.albums.push(title);
        resolve({ status: 201, data: { title, added: true } });
      }
    }, Math.random() * 200);
  });
};

exports.changeChartPosition = ({ track, position }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const chosenSong = songs.find(song => song.title === track);
      if (
        !track ||
        !position ||
        typeof track !== 'string' ||
        typeof position !== 'number'
      ) {
        reject({
          status: 400,
          data: {
            msg:
              !track || !position
                ? 'Bad Request - a track and position property must be provided'
                : `Bad Request - tracks must be strings and new chart position must be numbers`
          }
        });
      }
      if (!chosenSong) {
        reject({
          status: 404,
          data: { msg: `sorry ${track} doesn't exist...` }
        });
      } else {
        chosenSong.chart_position = position;
        resolve({ status: 200, data: { song: chosenSong } });
      }
    }, Math.random() * 200);
  });
};
