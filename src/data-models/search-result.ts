import { Artist } from './artist';
import { SearchResultSlice } from './search-result-slice';
import { SimplifiedAlbum } from './simplified-album';
import { Track } from './track';

export class SearchResult {
  albums?: SearchResultSlice<SimplifiedAlbum>;
  artists?: SearchResultSlice<Artist>;
  tracks?: SearchResultSlice<Track>;
  query: string;
}
