import { Artist } from '../data-models/artist';

export function testArtist(): Artist {
  return {
    followers: {
      href: 'href/follower',
      total: 192,
    },
    genres: ['amazing'],
    images: [{ url: 'image/of/artist' }],
    popularity: 42,
    external_urls: { spotify: 'spotify/external/url/artist' },
    href: 'href/artist',
    id: 'artistID' + Math.random(),
    name: 'Full Artist',
    type: 'artist',
    uri: 'uri/artist',
  };
}
