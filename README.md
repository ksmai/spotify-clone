# spotify-clone
[![Build Status](https://travis-ci.org/ksmai/spotify-clone.svg?branch=master)](https://travis-ci.org/ksmai/spotify-clone)

## LIVE DEMO
https://ksmai.github.io/spotify-clone/

## Introduction
The objective of this project is to create a new user interface similar to [Spotify web player](https://play.spotify.com/) with data fetched from the [Spotify web API](https://developer.spotify.com/web-api/). It allows users to search and view various songs/albums/artists, and listen to the music with the built-in HTML5 audio player. Users can also look up their recent search/play history.

## Known limitations
**UPDATE** Starting from 30 May, Spotify requires requests to every API endpoint to be authenticated. So this project has been updated to authenticate all requests.  
Since this project sends unauthenticated requests to the Spotify web API, certain features of the official web player are not supported, including
  - playlists
  - new releases
  - browse by categories
  - follow
  - recommendations

In addition, it can only play 30-second-long preview tracks provided by Spotify instead of full tracks. There are also some tracks that are not availabe in the preview format.

There are also no signup/login mechanisms, so user data will not be synchronized across multiple devices.

## To start
```
git clone https://github.com/ksmai/spotify-clone
cd spotify-clone
yarn
yarn start
```

## To build for production
```
yarn run build
```

## To run test
```
yarn test
```

## LICENSE
MIT
