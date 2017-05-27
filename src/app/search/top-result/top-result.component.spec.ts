import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';

import { testAlbum, testArtist, testTrack } from '../../../test-utils/';
import { CoreModule } from '../../core/core.module';
import { PlayerService } from '../../core/player.service';
import { SearchService } from '../../core/search.service';
import { TopResultComponent } from './top-result.component';

let fixture: ComponentFixture<TopResultComponent>;
let component: TopResultComponent;

function createComponent() {
  fixture = TestBed.createComponent(TopResultComponent);
  component = fixture.componentInstance;

  return fixture.whenStable();
}

describe('TopResultComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          CoreModule,
        ],
        declarations: [
          TopResultComponent,
        ],
        schemas: [
          NO_ERRORS_SCHEMA,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should get track results on init', () => {
    const spy = spyOn(TestBed.get(SearchService), 'getTracks')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get artist results on init', () => {
    const spy = spyOn(TestBed.get(SearchService), 'getArtists')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get album results on init', () => {
    const spy = spyOn(TestBed.get(SearchService), 'getAlbums')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get best match results on init', () => {
    const spy = spyOn(TestBed.get(SearchService), 'getBest')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get player status on init', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'getCurrentStatus')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should match the currently playing album', () => {
    const album = testAlbum();
    const status = {
      track: testTrack(),
      paused: false,
      context: { type: album.type, id: album.id },
    };

    expect(component.matchAlbum(album, status)).toBe(true);
    status.context.id += '1';
    expect(component.matchAlbum(album, status)).toBe(false);
  });

  it('should match the currently playing artist', () => {
    const artist = testArtist();
    const status = {
      track: testTrack(),
      paused: false,
      context: { type: artist.type, id: artist.id },
    };

    expect(component.matchArtist(artist, status)).toBe(true);
    status.context.id += '1';
    expect(component.matchArtist(artist, status)).toBe(false);
  });

  it('should extract the ID of currently playing album', () => {
    const album = testAlbum();
    const status = {
      track: testTrack(),
      paused: false,
      context: { type: album.type, id: album.id },
    };

    expect(component.playingAlbumID(status)).toEqual(album.id);
    status.context.type = 'artist';
    expect(component.playingAlbumID(status)).toBeFalsy();
  });

  it('should extract the ID of currently playing artist', () => {
    const artist = testArtist();
    const status = {
      track: testTrack(),
      paused: false,
      context: { type: artist.type, id: artist.id },
    };

    expect(component.playingArtistID(status)).toEqual(artist.id);
    status.context.type = 'album';
    expect(component.playingArtistID(status)).toBeFalsy();
  });
});
