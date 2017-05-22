import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/shareReplay';

import { Album } from '../../data-models/album';
import { Playing } from '../../data-models/playing';
import { Track } from '../../data-models/track';

@Injectable()
export class PlayerService {
  private playlist: BehaviorSubject<Track[]>;
  private update: BehaviorSubject<any>;
  private current: Observable<Playing>;
  private request: Subject<boolean>;

  constructor(private http: Http) {
    // emit array of tracks to be played
    this.playlist = new BehaviorSubject<Track[]>([]);

    // hold the play(true) / pause(false) requests
    this.request = new Subject<boolean>();

    // A subject holding updates about currently playing album/artist
    this.update = new BehaviorSubject<any>({
      id: null,
      type: null,
      paused: true,
    });

    // Update the current state using new data from the subject 'update'
    this.current = this.update
      .scan((acc, cur) => Object.assign({}, acc, cur))
      .shareReplay(1);
  }


  playAlbum(album: Album) {
  }

  playArtist(artist: Track[], idx?: number) {
    let tracks: Track[];
    if (Array.isArray(artist)) {
      const orderedTracks: Track[] = idx ?
        artist.slice(idx).concat(artist.slice(0, idx)) :
        artist;
      tracks = orderedTracks.filter(track => !!track.preview_url);
    }

    if (tracks.length > 0) {
      this.playlist.next(tracks);
    }
  }

  play(): void {
    this.request.next(true);
  }

  pause(): void {
    this.request.next(false);
  }

  updateStatus(data: any) {
    this.update.next(data);
  }

  getPlaylist() {
    return this.playlist.asObservable();
  }

  getCurrentStatus() {
    return this.current;
  }

  getRequest() {
    return this.request.asObservable();
  }
}
