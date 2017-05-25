import { Album } from '../data-models/album';
import { testTrack } from './test-track';

export function testAlbum(): Album {
  return {
    copyrights: [{ type: 'c', text: 'hello copyright' }],
    genres: ['good'],
    images: [{ url: 'album/image' }],
    label: 'album',
    popularity: 42,
    release_date: '11/11/11',
    release_date_precision: 'year',
    tracks: {
      items: [testTrack()],
      next: null,
      previous: null,
      total: 0,
      href: 'paging/track/href',
      offset: 0,
      limit: 50,
    },
    album_type: 'album',
    artists: [{
      external_urls: { spotify: '/external/artist' },
      href: 'href/artist',
      id: 'artistID' + Math.random(),
      name: 'some simplified artists',
      type: 'artist',
      uri: 'artist/uri',
    }],
    external_urls: { spotify: '/album/spotify' },
    href: '/href/album',
    id: 'idOfAlubm' + Math.random(),
    name: 'Full Album',
    type: 'album',
    uri: 'album/uri',
  };
}
