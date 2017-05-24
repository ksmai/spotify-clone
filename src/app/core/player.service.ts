import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Album } from '../../data-models/album';
import { Playing } from '../../data-models/playing';
import { SimplifiedArtist } from '../../data-models/simplified-artist';
import { Track } from '../../data-models/track';
import { AlbumService } from './album.service';
import { ArtistService } from './artist.service';
import { PlayerHistoryService } from './player-history.service';

@Injectable()
export class PlayerService {
  private playlist: BehaviorSubject<Track[]>;
  private update: BehaviorSubject<any>;
  private current: Observable<Playing>;
  private request: Subject<boolean>;

  constructor(
    private http: Http,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private playerHistoryService: PlayerHistoryService,
  ) {
    // emit array of tracks to be played
    this.playlist = new BehaviorSubject<Track[]>([]);

    // hold the play(true) / pause(false) requests
    this.request = new Subject<boolean>();

    // A subject holding updates about currently playing album/artist
    this.update = new BehaviorSubject<any>({
      track: null,
      paused: true,
      context: {
        type: null,
        id: null,
      },
    });

    // Update the current state using new data from the subject 'update'
    this.current = this.update
      .scan((acc, cur) => Object.assign({}, acc, cur))
      .shareReplay(1);
  }

  // Transform the SimplifiedTrack[] in Album into Track[]
  // and play the tracks with this.playTrackList
  playAlbum(album: Album, trackID?: string): Promise<boolean> {
    const tracks = album.tracks.items;
    const metadata = Object.assign({}, album);
    delete metadata.tracks;

    const playableTracks = tracks.map((track) => Object.assign({}, track, {
      album: metadata,
    }) as Track);

    return this.playTrackList(
      playableTracks,
      { type: 'album', id: album.id },
      trackID,
    );
  }

  // query for the Album using AlbumService
  // then play the Album with this.playAlbum
  playAlbumWithID(id: string, trackID?: string): Promise<boolean> {
    return this.albumService
      .getById(id)
      .switchMap((album: Album) => {
        if (!album) {
          return Promise.resolve(false);
        }

        return this.playAlbum(album, trackID);
      })
      .toPromise();
  }

  playArtistWithID(id: string): Promise<boolean> {
    return this.artistService
      .getTopTracks(id)
      .switchMap((tracks: Track[]) => {
        return this.playTrackList(tracks, { id, type: 'artist' });
      })
      .toPromise();
  }

  playTrackList(
    trackList: Track[],
    context: { type: string, id: string },
    trackID?: string,
  ): Promise<boolean> {
    const idx = trackID &&
      trackList.findIndex((track) => track.id === trackID);

    const orderedTracks: Track[] = idx && idx > 0 ?
      trackList.slice(idx).concat(trackList.slice(0, idx)) :
      trackList;

    const tracks = orderedTracks.filter((track) => !!track.preview_url);
    if (tracks.length > 0) {
      this.playlist.next(tracks);
      this.updateStatus({ context });
      this.recordPlayHistory(tracks, context);

      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
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

  private recordPlayHistory(
    tracks: Track[],
    context: { type: string, id: string },
  ) {
    let name: string;
    if (context.type === 'album') {
      name = tracks[0].album.name;
    } else {
      const artists: SimplifiedArtist[] = [];
      tracks.forEach((track) => {
        if (track.artists) {
          artists.push(...track.artists);
        }
      });
      const match = artists.find((artist) => artist.id === context.id);
      name = match && match.name;
    }

    this.playerHistoryService.nextRecord(Object.assign({},
      context,
      { name },
    ));
  }
}
