# Promises. Promises

You are in charge of creating a new improved version of Spotify. Not only are they adding features but they've promisified all their functions.

You will be creating an api build on "spotify data". You will allow users to request songs, lyrics. You will also provide some new services like analysing song lyrics, allowing users to change their favourite songs to number 1 in the charts.

To achieve this you have a series of utility functions provided for you. Every function is Promise based and mocks a real request over the internet - you will have extra meta information like status codes in the response of these utility functions, and if things go wrong you may get the dreaded 404 Not found so make full use of your promise `.catch` method.

## Utility functions AVAILABLE

- `requestAllSongs` takes no arguments, responds with an array of song objects

- `getAlbums` takes no arguments, responds with an array of album title strings

- `requestSongByTitle` takes a song title, responds with a single song object

- `requestSongLyrics` takes a song title, responds with a lyrics string

- `getSongAnalysis` takes a full set of lyrics (string) as its argument, responds with an analysis object

- `postAlbum` takes an album title, responds with the posted song object

- `changeChartPosition` takes an object `{track: <songtitle>, position; number}`, responds with the updated song object

## DAY 1

1. GET `/albums`

- This will take no user input on the request.
- Once you have the albums back from "Spotify", make sure you don't send back to your client the extra fluff, e.g. status codes and data - your response should fit the following format.

```js
{
  "albums": [
    "10 Years of Akala",
    "I am Sasha Fierce",
    "A Night at the Opera",
    "Youtube Best Hits"
  ]
}
```

2.a GET `/tracks` get all songs.

```js
{
  "songs": [
    {
      "title": "Find No Enemy",
      "artist": "Akala",
      "album": 0,
      "chart_position": 0
    },
    {
      "title": "Baby Shark",
      "artist": "Pinkfong",
      "album": 3,
      "chart_position": 0
    }...
```

2.b Add some extra functionality to the `/tracks` endpoint, allow for an album query e.g.`?album=3` to get all the songs for an album.

```js
{
  "songs": [
    {
      "title": "Baby Shark",
      "artist": "Pinkfong",
      "album": 3,
      "chart_position": 0
    }
  ]
}
```

3. GET `/tracks/:track_title` get song by track

- This endpoint should take a track title on the url

```js
{
  song: {
      title: "Find No Enemy",
      artist: "Akala",
      album: 0,
      chart_position: 0
  }
}
```

4. GET `/lyrics/:track_id` or GET `tracks/:track_id/lyrics` get lyrics for a song by its title.

- This endpoint should take a track title on the url
- This endpoint should also put the song title onto the client response

```js
{
  song: `Baby Shark`;
  lyrics: `....`;
}
```

5. GET `tracks/:track_title/analysis` get analysis for a song

- This endpoint should take a track title on the url.
- This endpoint will entail more steps for your controller to manage, stop and think how many utility functions you may need to use.

```js
{
  "song": "Single Ladies",
  "analysis": {
    "joy": 0.85,
    "fear": 0.28,
    "sadness": 0.31
  }
}
```

6. POST `/albums`

- This endpoint should take an album title on the request body e.g.

```js
{
  title: 'My Fav album';
}
```

- You should send an appropriate status code to the client with a response like below

```js
{
  album: {
    title:'your added album title',
    added: true
}
```

7. PATCH `tracks/:track_title` change chart position

- This endpoint should take an album title on the url and a value to change the chart position by on the request body e.g.

```js
{
  newPosition: 2;
}
```

Your client response should look like:

```js
{
  "song": {
    "title": "Single Ladies",
    "artist": "Beyonce",
    "album": 1,
    "chart_position": 2
  }
}
```

8. Error handling - You should now go back and utelise error handling middleware and `catch` to send tailored error messages to your user should they do something wrong
   Some example wrong doings might be

- `tracks/track_that_doesnt_exist` - 404
- on Post or Patches if the user doesn't provide the right information on the request body: keys and values!

### DAY 2 - Using Promise.all

1. Refactor getting a songs lyrics (Day 1 task 4) to get the song object and its lyrics at once

```js
{
  "song": {
    "title": "Single Ladies",
    "artist": "Beyonce",
    "album": "I am Sasha Fierce",
    "chart_position": 2
  },
  "lyrics": `"gettin' bodied\n(If you ready, get it ready) gettin' bodied\n(Let's get it and drop it) hey\nGive it up for my sister!\nAll right now\nEverybody put your hands together\nDo we have any single ladies in the house tonight?\nsing\nAll the single ladies (All the single ladies)\nAll the single ladies (All the single ladies)\nAll the s`
```

2. Refactor getting a song by track_title (Day 1 task 3) to replace the album number with the album title - this will needing a call to `getAlbums`. You should place this extra functionality in the model as it deals with data and formatting.

```js
{
  "song": {
    "title": "Single Ladies",
    "artist": "Beyonce",
    "album": "I am Sasha Fierce",
    "chart_position": 2
  }
}
```

3. ADVANCED - get all songs and replace all album numbers with album titles - this will need to make a call to `getAlbums`

```js
{
  "songs": [
    {
      "title": "Find No Enemy",
      "artist": "Akala",
      "album": "10 Years of Akala",
      "chart_position": 0
    },
    {
      "title": "Baby Shark",
      "artist": "Pinkfong",
      "album": "Youtube Best Hits",
      "chart_position": 0
    }
```

3.b optional ADVANCED -- make your own Spotify endpoint inside the utils/spotify file using your own new Promise constructor -- have a look at the other ones for reference

4. style with EJS!
