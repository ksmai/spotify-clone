import { SimplifiedAlbum } from './simplified-album';
import { SimplifiedArtist } from './simplified-artist';

export class Track {
  album: SimplifiedAlbum;
  artists: SimplifiedArtist[];
  available_markets: string[]; /* tslint:disable-line variable-name */
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string; /* tslint:disable-line variable-name */
  type: string;
}
