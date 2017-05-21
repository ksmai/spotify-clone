import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../../data-models/artist';
import { PagingObject } from '../../data-models/paging-object';
import { SimplifiedAlbum } from '../../data-models/simplified-album';
import { Track } from '../../data-models/track';

@Injectable()
export class ArtistService {
  private next: string;
  private countryCode: string;

  constructor(private http: Http) {
  }

  getArtist(id: string): Observable<Artist> {
    return this.http
      .get(`https://api.spotify.com/v1/artists/${id}`)
      .retry(5)
      .map((res: Response) => res.json() as Artist)
      .catch(() => Observable.of(null));
  }

  getAlbums(id: string): Observable<SimplifiedAlbum[]> {
    const url = `https://api.spotify.com/v1/artists/${id}/albums`;
    const params = new URLSearchParams();
    params.set('album_type', 'album,single,compilation');
    params.set('limit', '50');
    params.set('offset', '0');
    this.next = null;

    return this.getCountryCode()
      .do((country) => params.set('market', country))
      .switchMap(() => this.http.get(url, { search: params }))
      .retry(5)
      .map((res: Response) => res.json() as PagingObject<SimplifiedAlbum>)
      .do((page) => this.next = page.next)
      .map((page) => page.items as SimplifiedAlbum[])
      .expand(() => this.next ? this.getNextAlbums() : Observable.empty() as Observable<SimplifiedAlbum[]>)
      .scan((acc: SimplifiedAlbum[], cur) => acc.concat(cur), [])
      .catch(() => Observable.of([]));
  }

  getRelatedArtists(id: string): Observable<Artist[]> {
    return this.http
      .get(`https://api.spotify.com/v1/artists/${id}/related-artists`)
      .retry(5)
      .map((res: Response) => res.json().artists as Artist[])
      .catch(() => Observable.of([]));
  }

  getTopTracks(id: string): Observable<Track[]> {
    return this.getCountryCode()
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

  private getCountryCode(): Observable<string> {
    if (this.countryCode) {
      return Observable.of(this.countryCode);
    }

    return this.http
      .get('https://freegeoip.net/json/')
      .map((res: Response) => res.json().country_code as string)
      .do((country) => this.countryCode = country)
      .retry(5)
      .catch(() => Observable.of('US'));
  }

  private getNextAlbums(): Observable<SimplifiedAlbum[]> {
    return this.http
      .get(this.next)
      .retry(5)
      .map((res: Response) => res.json() as PagingObject<SimplifiedAlbum>)
      .do((page) => this.next = page.next)
      .map((page) => page.items as SimplifiedAlbum[])
      .catch(() => Observable.of([]));
  }
}
