/* tslint:disable variable-name */
import { ImageObject } from './image';
import { SimplifiedArtist } from './simplified-artist';

export class SimplifiedAlbum {
  album_type: string;
  artists: SimplifiedArtist[];
  external_urls: { [key: string]: string };
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  type: string;
  uri: string;
}
