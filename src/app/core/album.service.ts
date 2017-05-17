import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Observable } from 'rxjs/Observable';

import { Album } from '../../data-models/album';

@Injectable()
export class AlbumService {
  constructor(private http: Http) {
  }

  getById(id: string): Observable<Album> {
    return this.http
      .get(`https://api.spotify.com/v1/albums/${id}`)
      .retry(5)
      .map((res: Response) => res.json() as Album)
      .catch(() => Observable.of(null));
  }
}
