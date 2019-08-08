const { expect } = require('chai');

const {
  requestAllSongs,
  requestSongByTitle,
  requestSongLyrics,
  getSongAnalysis,
  getAlbums,
  postAlbum,
  changeChartPosition
} = require('../utils/spotify');

const {
  songDatabase,
  albumDatabase,
  lyricDatabase,
  analysesDatabase
} = require('../data/spotify-database');
const babySharkLyrics = require('../data/lyrics/baby-shark');

describe('requestAllSongs', () => {
  it('is a function', () => {
    expect(requestAllSongs).to.be.a('function');
  });
  it('returns a promise', () => {
    expect(requestAllSongs()).to.be.an.instanceOf(Promise);
  });
  it('promise resolves with object with data and status property', () => {
    return requestAllSongs().then(response => {
      expect(response).to.have.all.keys('data', 'status');
      expect(response.status).to.equal(200);
    });
  });
  it('response data should have songs property which is an array of songs', () => {
    return requestAllSongs().then(({ data: { songs } }) => {
      expect(songs).to.have.be.an('Array');
      expect(songs).to.eql(songDatabase.songs);
    });
  });
  it('response songs should not be the same reference as database songs', () => {
    return requestAllSongs().then(({ data: { songs } }) => {
      expect(songs).to.not.equal(songDatabase.songs);
      expect(songs[0]).to.not.equal(songDatabase.songs[0]);
    });
  });
});

describe('getAlbums', () => {
  it('is a function', () => {
    expect(getAlbums).to.be.a('function');
  });
  it('returns a promise', () => {
    expect(getAlbums()).to.be.an.instanceOf(Promise);
  });
  it('promise resolves with object with data and status property', () => {
    return getAlbums().then(response => {
      expect(response).to.have.all.keys('data', 'status');
      expect(response.status).to.equal(200);
    });
  });
  it('response data should have album property which is an array of album titles', () => {
    return getAlbums().then(({ data: { albums } }) => {
      expect(albums).to.have.be.an('Array');
      expect(albums).to.eql(albumDatabase.albums);
    });
  });
  it('response albums should not be the same reference as database albums', () => {
    return getAlbums().then(({ data: { albums } }) => {
      expect(albums).to.not.equal(albumDatabase.albums);
    });
  });
});

describe('requestSongByTitle', () => {
  it('is a function', () => {
    expect(requestSongByTitle).to.be.a('function');
  });
  it('returns a promise', () => {
    expect(requestSongByTitle('Baby Shark')).to.be.an.instanceOf(Promise);
  });
  it('promise resolves with object with data and status property', () => {
    return requestSongByTitle('Baby Shark').then(response => {
      expect(response).to.have.all.keys('data', 'status');
      expect(response.status).to.equal(200);
    });
  });
  it('responds with requested song object', () => {
    return requestSongByTitle('Baby Shark').then(({ data }) => {
      expect(data.song).to.to.be.an('object');
      expect(data.song).to.have.all.keys(
        'title',
        'artist',
        'album',
        'chart_position'
      );
      expect(data.song).to.eql(songDatabase.songs[1]);
      expect(data.song).to.not.equal(songDatabase.songs[1]);
    });
  });
  it('promise rejects with status 400 when no song passed in', () => {
    return requestSongByTitle().catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(400);
      expect(err.data.msg).to.equal(
        'you must pass a song title to request a track'
      );
    });
  });
  it('promise rejects with status 404 when non-existent song passed in', () => {
    return requestSongByTitle('non-existent-song').catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(404);
      expect(err.data.msg).to.equal("couldn't find non-existent-song");
    });
  });
});

describe('requestSongLyrics', () => {
  it('is a function', () => {
    expect(requestSongLyrics).to.be.a('function');
  });
  it('returns a promise', () => {
    expect(requestSongLyrics('Baby Shark')).to.be.an.instanceOf(Promise);
  });
  it('promise resolves with object with data and status property', () => {
    return requestSongLyrics('Baby Shark').then(response => {
      expect(response).to.have.all.keys('data', 'status');
      expect(response.status).to.equal(200);
    });
  });
  it('responds with lyrics on data property ', () => {
    return requestSongLyrics('Baby Shark').then(({ data }) => {
      expect(data.lyrics).to.be.a('string');
      expect(data.lyrics).to.equal(babySharkLyrics);
    });
  });
  it('promise rejects with status 400 when no song passed in', () => {
    return requestSongLyrics().catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(400);
      expect(err.data.msg).to.equal(
        'you must pass a song title to request lyrics'
      );
    });
  });
  it('promise rejects with status 404 when non-existent song passed in', () => {
    return requestSongLyrics('non-existent-song').catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(404);
      expect(err.data.msg).to.equal("sorry non-existent-song doesn't exist...");
    });
  });
});

describe('getSongAnalysis', () => {
  it('is a function', () => {
    expect(getSongAnalysis).to.be.a('function');
  });
  it('returns a promise', () => {
    expect(getSongAnalysis(babySharkLyrics)).to.be.an.instanceOf(Promise);
  });
  it('promise resolves with object with data and status property', () => {
    return getSongAnalysis(babySharkLyrics).then(response => {
      expect(response).to.have.all.keys('data', 'status');
      expect(response.status).to.equal(200);
    });
  });
  it('responds with lyrics on data property ', () => {
    return getSongAnalysis(babySharkLyrics).then(({ data }) => {
      expect(data.analysis).to.be.an('object');
      expect(data.analysis).to.eql({
        joy: 0.65,
        fear: 0.88,
        sadness: 0.3
      });
    });
  });
  it('promise rejects with status 404 when no song lyrics passed in', () => {
    return getSongAnalysis().catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(400);
      expect(err.data.msg).to.equal(
        'you must pass some song lyrics to request an analysis'
      );
    });
  });
  it('promise rejects with status 404 when non-existent song passed in', () => {
    return getSongAnalysis('non-existent-song-lyrics').catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(404);
      expect(err.data.msg).to.equal(
        'sorry we dont have analysis on that song... or maybe that those long lyrics are incorrect? ...'
      );
    });
  });
});

describe('postAlbum', () => {
  beforeEach(() => {
    // "reseeding" album array for each post
    const freshAlbumObject = {
      albums: [
        '10 Years of Akala',
        'I am Sasha Fierce',
        'A Night at the Opera',
        'Youtube Best Hits'
      ]
    };
    albumDatabase.albums = freshAlbumObject.albums;
    return;
  });
  it('is a function', () => {
    expect(postAlbum).to.be.a('function');
  });
  it('returns a promise', () => {
    expect(postAlbum('Dark Side of the Moon')).to.be.an.instanceOf(Promise);
  });
  it('promise resolves with object with data and status property', () => {
    return postAlbum('Good Girl Gone Bad').then(response => {
      expect(response).to.have.all.keys('data', 'status');
      expect(response.status).to.equal(201);
    });
  });
  it('promise resolves posted album and added true', () => {
    return postAlbum('Good Girl Gone Bad').then(({ data }) => {
      expect(data.title).to.equal('Good Girl Gone Bad');
      expect(data.added).to.be.true;
    });
  });
  it('promise rejects with status 400 when no album title passed in', () => {
    return postAlbum().catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(400);
      expect(err.data.msg).to.equal(
        'Bad Request - you must pass an album title to post an album'
      );
    });
  });
  it('promise rejects with status 400 when non string album title passed', () => {
    return postAlbum({}).catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(400);
      expect(err.data.msg).to.equal(
        'Bad Request - album titles must be strings'
      );
    });
  });
  it('promise rejects with status 422 album that already exists is posted', () => {
    return postAlbum('I am Sasha Fierce').catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(422);
      expect(err.data.msg).to.equal(
        'Unprocessible entity - album I am Sasha Fierce already exists'
      );
    });
  });
});

describe('changeChartPosition', () => {
  it('is a function', () => {
    expect(changeChartPosition).to.be.a('function');
  });
  it('returns a promise', () => {
    expect(
      changeChartPosition({ track: 'Baby Shark', position: 1 })
    ).to.be.an.instanceOf(Promise);
  });
  it('promise resolves with object with data and status property', () => {
    return changeChartPosition({ track: 'Baby Shark', position: 1 }).then(
      response => {
        expect(response).to.have.all.keys('data', 'status');
        expect(response.status).to.equal(200);
      }
    );
  });
  it('responds with updated song on data property ', () => {
    return changeChartPosition({ track: 'Baby Shark', position: 3 }).then(
      ({ data }) => {
        expect(data.song).to.be.an('object');
        expect(data.song.title).to.equal('Baby Shark');
        expect(data.song.chart_position).to.equal(3);
      }
    );
  });
  it('proving song has been updated', () => {
    return requestSongByTitle('Baby Shark').then(({ data }) => {
      expect(data.song.title).to.equal('Baby Shark');
      expect(data.song.chart_position).to.equal(3);
    });
  });
  it('promise rejects with status 404 when non-existent song passed in', () => {
    return changeChartPosition({
      track: 'non-existent-song',
      position: 1
    }).catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(404);
      expect(err.data.msg).to.equal("sorry non-existent-song doesn't exist...");
    });
  });
  it('promise rejects with status 400 when no song title passed in song passed in', () => {
    return changeChartPosition({ position: 1 }).catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(400);
      expect(err.data.msg).to.equal(
        'Bad Request - a track and position property must be provided'
      );
    });
  });
  it('promise rejects with status 400 when no song position passed in song passed in', () => {
    return changeChartPosition({ track: 'Baby Shark' }).catch(err => {
      expect(err).to.have.all.keys('data', 'status');
      expect(err.status).to.equal(400);
      expect(err.data.msg).to.equal(
        'Bad Request - a track and position property must be provided'
      );
    });
  });
  it('promise rejects with status 400 when no track is not a string', () => {
    return changeChartPosition({ track: 3, position: 1 }).catch(err => {
      expect(err.status).to.equal(400);
      expect(err.data.msg).to.equal(
        'Bad Request - tracks must be strings and new chart position must be numbers'
      );
    });
  });
  it('promise rejects with status 400 when no position is not a number', () => {
    return changeChartPosition({ track: 'Baby Shark', position: {} }).catch(
      err => {
        expect(err.status).to.equal(400);
        expect(err.data.msg).to.equal(
          'Bad Request - tracks must be strings and new chart position must be numbers'
        );
      }
    );
  });
});
