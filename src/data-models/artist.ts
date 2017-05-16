import { Followers } from './followers';
import { ImageObject } from './image';

export class Artist {
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
