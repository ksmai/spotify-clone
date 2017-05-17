/* tslint:disable variable-name */
import { Copyright } from './copyright';
import { ImageObject } from './image';
import { PagingObject } from './paging-object';
import { SimplifiedAlbum } from './simplified-album';
import { SimplifiedArtist } from './simplified-artist';
import { SimplifiedTrack } from './simplified-track';

export class Album extends SimplifiedAlbum {
  copyrights: Copyright[];
  genres: string[];
  images: ImageObject[];
  label: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  tracks: PagingObject<SimplifiedTrack>;
}
