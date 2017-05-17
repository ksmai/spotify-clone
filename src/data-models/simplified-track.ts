/* tslint:disable variable-name */
import { SimplifiedArtist } from './simplified-artist';

export class SimplifiedTrack {
  artists: SimplifiedArtist[];
  duration_ms: number;
  href: string;
  id: string;
  name: string;
  preview_url: string;
  type: string;
  uri: string;
}
