import { Track } from '../data-models/track';

const myArtist = {
  external_urls: { spotify: '/spotify/artist' },
  href: '/href/artist',
  id: '789' + Math.random(),
  name: 'My Artist',
  type: 'artist',
  uri: '789',
};

export function testTrack(): Track {
  return {
    album: {
      album_type: 'album',
      artists: [myArtist],
      external_urls: { spotify: '/spotify/album' },
      href: '/href/album',
      id: '456' + Math.random(),
      images: [{ url: 'image/url' }],
      name: 'My album',
      type: 'album',
      uri: '456',
    },
    artists: [myArtist],
    duration_ms: 30000,
    external_urls: { spotify: '/spotify/track' },
    href: '/href/track',
    id: '123' + Math.random(),
    name: 'My Track',
    preview_url: '/preview/url',
    type: 'track',
    uri: '123',
  };
}
