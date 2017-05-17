import { Artist } from './artist';
import { SearchResultSlice } from './search-result-slice';
import { SimplifiedAlbum } from './simplified-album';
import { Track } from './track';

/* tslint:disable variable-name */
export class SearchResult {
  albums?: SearchResultSlice<SimplifiedAlbum>;
  artists?: SearchResultSlice<Artist>;
  tracks?: SearchResultSlice<Track>;
  best_match?: {
    items: Array<SimplifiedAlbum|Artist|Track>;
  };
  query: string;
}
