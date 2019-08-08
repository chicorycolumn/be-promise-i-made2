const songDatabase = {
  songs: [
    { title: 'Find No Enemy', artist: 'Akala', album: 0, chart_position: 0 },
    { title: 'Baby Shark', artist: 'Pinkfong', album: 3, chart_position: 0 },
    { title: 'Single Ladies', artist: 'Beyonce', album: 1, chart_position: 0 },
    { title: 'Sweet Dreams', artist: 'Beyonce', album: 1, chart_position: 0 },
    { title: 'Bohemian Rhapsody', artist: 'Queen', album: 2, chart_position: 0 }
  ]
};

let albumDatabase = {
  albums: [
    '10 Years of Akala',
    'I am Sasha Fierce',
    'A Night at the Opera',
    'Youtube Best Hits'
  ]
};

const lyricDatabase = {
  lyrics: {
    'Find No Enemy': require('./lyrics/find-no-enemy'),
    'Baby Shark': require('./lyrics/baby-shark'),
    'Single Ladies': require('./lyrics/single-ladies'),
    'Sweet Dreams': require('./lyrics/sweet-dreams'),
    'Bohemian Rhapsody': require('./lyrics/bohemian-rhapsody')
  }
};

const analysesDatabase = {
  analyses: {
    [lyricDatabase.lyrics[
      'Find No Enemy'
    ]]: require('./analyses/find-no-enemy'),
    [lyricDatabase.lyrics['Baby Shark']]: require('./analyses/baby-shark'),
    [lyricDatabase.lyrics[
      'Single Ladies'
    ]]: require('./analyses/single-ladies'),
    [lyricDatabase.lyrics['Sweet Dreams']]: require('./analyses/sweet-dreams'),
    [lyricDatabase.lyrics[
      'Bohemian Rhapsody'
    ]]: require('./analyses/bohemian-rhapsody')
  }
};

module.exports = {
  songDatabase,
  albumDatabase,
  lyricDatabase,
  analysesDatabase
};
