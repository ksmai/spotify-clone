import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import {
  FakeActivatedRoute,
  FakeRouterLink,
  testAlbum,
  testTrack,
} from '../../test-utils/';
import { CoreModule } from '../core/core.module';
import { PlayerService } from '../core/player.service';
import { MaterialModule } from '../shared/material.module';
import { CopyrightPipe } from '../shared/pipes/copyright.pipe';
import { AlbumComponent } from './album.component';

let fixture: ComponentFixture<AlbumComponent>;
let component: AlbumComponent;

function createComponent() {
  fixture = TestBed.createComponent(AlbumComponent);
  component = fixture.componentInstance;

  return fixture.whenStable();
}

describe('AlbumComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
          CoreModule,
        ],
        declarations: [
          CopyrightPipe,
          FakeRouterLink,
          AlbumComponent,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: FakeActivatedRoute },
        ],
        schemas: [
          NO_ERRORS_SCHEMA,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should update background', () => {
    component.updateBackground('#abc');
    fixture.detectChanges();
    const hostElement = fixture.debugElement.nativeElement;
    const backgroundImage = getComputedStyle(hostElement).backgroundImage;
    expect(backgroundImage).toContain('linear-gradient');
  });

  it('should get player status on init', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'getCurrentStatus');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should just play if album match', () => {
    spyOn(component, 'matchAlbum').and.returnValue(true);
    const spy = spyOn(TestBed.get(PlayerService), 'play');
    component.play(null, null);
    expect(spy).toHaveBeenCalled();
  });

  it('should send the album to play if not match', () => {
    spyOn(component, 'matchAlbum').and.returnValue(false);
    const spy = spyOn(TestBed.get(PlayerService), 'playAlbum');
    const album = testAlbum();
    component.play(album, null);
    expect(spy).toHaveBeenCalledWith(album);
  });

  it('should pause', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'pause');
    component.pause();
    expect(spy).toHaveBeenCalled();
  });

  it('should match currently playing album', () => {
    const album = testAlbum();
    const track = testTrack();
    const status = {
      track: testTrack(),
      paused: false,
      context: { type: 'album', id: album.id },
    };
    expect(component.matchAlbum(album, status)).toBe(true);

    status.context.id += '123';
    expect(component.matchAlbum(album, status)).toBe(false);
  });

  it('should detect if its album is being played', () => {
    const album = testAlbum();
    const track = testTrack();
    const status = {
      track: testTrack(),
      paused: false,
      context: { type: 'album', id: album.id },
    };
    expect(component.isPlaying(album, status)).toBe(true);

    status.paused = true;
    expect(component.isPlaying(album, status)).toBe(false);
  });
});
