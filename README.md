# Promises. Promises

You are in charge of creating a new improved version of Spotify.

You will be creating an api built upon "Spotify data". You will allow users to request songs and lyrics. You will also add some new services like analysing song lyrics and allowing users to place their favourite songs at number 1 in the charts.

To achieve this you have an api serving you Spotify data (our very own `nc-spotify`).   This api serves up songs, albums, artists and more. You can use a variety of HTTP methods `GET`/`POST`/`PATCH`/`DELETE` on these endpoints. You will build your own api that should interact with `nc-spotify` using the promise based library [`axios`](https://github.com/axios/axios) to make http requests.

You should use Insomnia to make requests to your api and make sure you are sending back the appropriate responses.

## DAY 1

To get started go to the [nc-spotify server](https://nc-spotify.herokuapp.com/) and get familiar with the endpoints available. On the site there is a readme to help navigate around the endpoints but in general the endpoints are 

```js
`/<resource_name>/` // to interact with all of a resource e.g. albums
`/<resource_name>/<resource_id` // to interact with a specific resource e.g. album by id
`/resource_name?query=value` // to interact with a specific resource by any other identifier than id e.g. by chart_position
```

### 1. GET all albums

- This route will not accept any queries.
- Once you have the albums back from "Spotify" (AKA: `nc-spotify`), you will need to format the data so that your response fits the following format:

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

### 2.a GET all songs.

```js
{
  "songs": [
    {
      "id":1
      "title": "Find No Enemy",
      "artistId": 1,
      "albumId": 0,
      "chart_position": 0
    },
    {
      "id":2
      "title": "Baby Shark",
      "artistId": 2,
      "albumId": 3,
      "chart_position": 0
    }...
```

### 2.b Add some extra functionality to this endpoint, allow for a query e.g.`?album=3`to get all the songs for an album.

ADVANCED: Make this endpoint work for multiple queries (e.g. `album` AND `chart_position`)

- _HINT: if are doing the advanced option have a look at the [axios documentation](https://github.com/axios/axios#example) for making requests with queries._

```js
// ?album=3
{
  "songs": [
    {
      "id":2
      "title": "Baby Shark",
      "artistId": 4,
      "albumId": 3,
      "chart_position": 0
    }
  ]
}
```

### 3a. GET song by its id

- This endpoint should take a _song id_ in the url as a parametric endpoint

```js
{
  song: {
      id: 1,
      title: "Find No Enemy",
      artist: "Akala",
      album: 0,
      chart_position: 0
  }
}
```

### 3b. If no track is found e.g. when you search for something that isn't already in the list of songs, send the client back a 404 HTTP status and response

```js
// status 404 and
{
  msg: 'Song not found';
}
```

### 4. GET lyrics for a song by its title.

- This endpoint should take a _song title_ in the url as a parametric endpoint
- _HINT: to request the lyrics you must know the song's id first_
- This endpoint should also include the song title onto the response body

```js
{
  song: `Baby Shark`;
  lyrics: `....`;
}
```

### 5. GET analysis for a song

- This endpoint should take a _song title_ in the url as a parametric endpoint
- _HINT: to request a song's analysis of you must know the song's id first_

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

### 6. POST an album

- This endpoint should take an album title and an artist's id on the request body e.g.

```json
{
  "title": "your new album title",
  "artistId": "your new artist Id"
}
```

- You should validate information from the user is correct before posting. If things go terribly wrong tutors can reset the database from scratch so let them know!

- You should send an appropriate status code to the client with a response like below

```js
{
  album: {
    id: 'your new album id',
    title:'your added album title',
    artistId: 'your added artist Id'
    added: true
}
```

### 7. PATCH a song's chart position

- This endpoint should take song identifier as a parametric value in the url and a value to change the chart position by on the request body e.g.

```json
{
  "newPosition": 2;
}
```

- _HINT: to use `patch` on `nc-spotify`, you must use a parametric request (:id) and not a query_
- _HINT: on success the `nc-spotify` responds with the updated object_

Your client response should be formatted as the following:

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

### 8. Error handling - You should now go back and utilise error handling middleware and `.catch` to send tailored error messages to your user should something go wrong

Some example errors that could occur:

- `GET /api/tracks/track_that_doesnt_exist` - 404
- POST or PATCH with incorrect information on the request body: Wrong/missing keys and/or incorrect values!

## DAY 2 - Using Promise.all

### 1. Refactor getting a song's lyrics (Day 1 task 4) to send the song object and its lyrics all at once to send together on the response in the following format:

```js
{
  "song": {
    "title": "Single Ladies",
    "artist": "Beyonce",
    "album": "I am Sasha Fierce",
    "chart_position": 2
  },
  "lyrics": `"gettin' bodied\n(If you ready, get it ready) gettin' bodied\n(Let's get it and drop it) hey\nGive it up for my sister!\nAll right now\nEverybody put your hands together\nDo we have any single ladies in the house tonight?\nsing\nAll the single ladies (All the single ladies)\nAll the single ladies (All the single ladies)\nAll the s`...
```

### 2. Refactor GET analysis for a song (Day 1 task 5) to get the lyrics and the analysis

- _HINT: you don't need to wait for the lyrics to come back before you get the analysis_

### 3. Refactor getting a song by track_id (Day 1 task 3) to replace the album number with the album title (You may need to make a second request for that particular album).

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

### 4.a ADVANCED -- make an endpoint that will take the newData.txt file on the request body and post it to the database

- This endpoint should make use of `fs` and the `Promise` constructor

### 4.b extra ADVANCED - get all songs and replace all album numbers with album titles

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

### 5. Create a new branch on your project - [here's a great tutorial on git branches](https://www.atlassian.com/git/tutorials/using-branches)and refactor your GET endpoints to render EJS files.

Useful links:
- [Express template engines](https://expressjs.com/en/guide/using-template-engines.html)
- [EJS](https://ejs.co/)
- [Templating with EJS guide](https://scotch.io/tutorials/use-ejs-to-template-your-node-application)
