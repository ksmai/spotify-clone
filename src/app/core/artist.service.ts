import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../../data-models/artist';
import { PagingObject } from '../../data-models/paging-object';
import { SimplifiedAlbum } from '../../data-models/simplified-album';
import { Track } from '../../data-models/track';

@Injectable()
export class ArtistService {
  private next: string;

  constructor(private http: Http) {
  }

  getArtist(id: string): Observable<Artist> {
    return this.http
      .get(`https://api.spotify.com/v1/artists/${id}`)
      .retry(5)
      .map((res: Response) => res.json() as Artist)
      .catch(() => Observable.of(null));
  }

  getAlbums(id?: string): Observable<SimplifiedAlbum[]> {
    if (!id && !this.next) {
      return Observable.of(null);
    }

    let source;
    if (!id) {
      source = this.http.get(this.next);
    } else {
      const url = `https://api.spotify.com/v1/artists/${id}/albums`;
      const params = new URLSearchParams();
      params.set('album_type', 'album,single,compilation');
      params.set('limit', '50');
      params.set('offset', '0');
      this.next = null;

      source = this.http.get(url, { search: params });
    }

    return source
      .retry(5)
      .map((res: Response) => res.json() as PagingObject<SimplifiedAlbum>)
      .do((page) => this.next = page.next)
      .map((page) => page.items)
      .catch(() => Observable.of(null));
  }

  getRelatedArtists(id: string): Observable<Artist[]> {
    return this.http
      .get(`https://api.spotify.com/v1/artists/${id}/related-artists`)
      .retry(5)
      .map((res: Response) => res.json().artists as Artist[])
      .catch(() => Observable.of([]));
  }

  getTopTracks(id: string): Observable<Track[]> {
    return this.http
      .get('https://freegeoip.net/json/')
      .map((res: Response) => res.json().country_code as string)
      .map((country) => {
        const params = new URLSearchParams();
        params.set('country', country);

        return params;
      })
      .switchMap((params: URLSearchParams) => {
        const url = `https://api.spotify.com/v1/artists/${id}/top-tracks`;

        return this.http.get(url, { search: params });
      })
      .retry(5)
      .map((res: Response) => res.json().tracks as Track[])
      .catch(() => Observable.of([]));
  }
}
