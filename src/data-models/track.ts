import { SimplifiedAlbum } from './simplified-album';
import { SimplifiedTrack } from './simplified-track';

export class Track extends SimplifiedTrack {
  album: SimplifiedAlbum;
  popularity?: number;
}
