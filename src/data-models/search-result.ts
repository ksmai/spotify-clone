import { Artist } from './artist';
import { PagingObject } from './paging-object';
import { SimplifiedAlbum } from './simplified-album';
import { Track } from './track';

/* tslint:disable variable-name */
export class SearchResult {
  albums?: PagingObject<SimplifiedAlbum>;
  artists?: PagingObject<Artist>;
  tracks?: PagingObject<Track>;
  best_match?: {
    items: Array<SimplifiedAlbum|Artist|Track>;
  };
  query: string;
}
