import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineLatest';
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
import { MarketService } from './market.service';
import { TokenService } from './token.service';

@Injectable()
export class ArtistService {
  private next: string;

  constructor(
    private http: Http,
    private marketService: MarketService,
    private tokenService: TokenService,
  ) {
  }

  getArtist(id: string): Observable<Artist> {
    return this.tokenService
      .getAuthHeader()
      .switchMap((headers) => this.http
        .get(`https://api.spotify.com/v1/artists/${id}`, { headers })
        .retry(5)
        .map((res: Response) => res.json() as Artist)
        .catch(() => Observable.of(null)),
      );
  }

  getAlbums(id: string): Observable<SimplifiedAlbum[]> {
    const url = `https://api.spotify.com/v1/artists/${id}/albums`;
    const params = new URLSearchParams();
    params.set('album_type', 'album,single,compilation');
    params.set('limit', '50');
    params.set('offset', '0');
    this.next = null;

    return this.marketService
      .getCountryCode()
      .do((country) => params.set('market', country))
      .combineLatest(this.tokenService.getAuthHeader(), (mkt, h) => h)
      .switchMap((headers) => this.http.get(url, {
        headers,
        search: params,
      }))
      .retry(5)
      .map((res: Response) => res.json() as PagingObject<SimplifiedAlbum>)
      .do((page) => this.next = page.next)
      .map((page) => page.items as SimplifiedAlbum[])
      .expand(() => this.next ? this.getNextAlbums() : Observable.empty() as Observable<SimplifiedAlbum[]>)
      .scan((acc: SimplifiedAlbum[], cur) => acc.concat(cur), [])
      .catch(() => Observable.of([]));
  }

  getRelatedArtists(id: string): Observable<Artist[]> {
    return this.tokenService
      .getAuthHeader()
      .switchMap((headers) => this.http
        .get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
          headers,
        })
        .retry(5)
        .map((res: Response) => res.json().artists as Artist[])
        .catch(() => Observable.of([])),
      );
  }

  getTopTracks(id: string): Observable<Track[]> {
    return this.marketService
      .getCountryCode()
      .map((country) => {
        const params = new URLSearchParams();
        params.set('country', country);

        return params;
      })
      .combineLatest(this.tokenService.getAuthHeader())
      .switchMap(([params, headers]: [URLSearchParams, Headers]) => {
        const url = `https://api.spotify.com/v1/artists/${id}/top-tracks`;

        return this.http.get(url, { headers, search: params });
      })
      .retry(5)
      .map((res: Response) => res.json().tracks as Track[])
      .catch(() => Observable.of([]));
  }

  private getNextAlbums(): Observable<SimplifiedAlbum[]> {
    return this.tokenService
      .getAuthHeader()
      .switchMap((headers) => this.http
        .get(this.next, { headers })
        .retry(5)
        .map((res: Response) => res.json() as PagingObject<SimplifiedAlbum>)
        .do((page) => this.next = page.next)
        .map((page) => page.items as SimplifiedAlbum[])
        .catch(() => Observable.of([])),
      );
  }
}
