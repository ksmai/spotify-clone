import { ImageObject } from './image';
import { SimplifiedArtist } from './simplified-artist';

export class SimplifiedAlbum {
  album_type: string; /* tslint:disable-line variable-name */
  artists: SimplifiedArtist[];
  href: string;
  id: string;
  images: ImageObject;
  name: string;
  type: string;
  uri: string;
}
