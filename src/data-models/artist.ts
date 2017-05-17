import { Followers } from './followers';
import { ImageObject } from './image';
import { SimplifiedArtist } from './simplified-artist';

export class Artist extends SimplifiedArtist {
  followers: Followers;
  genres: string[];
  images: ImageObject[];
  popularity: number;
}
