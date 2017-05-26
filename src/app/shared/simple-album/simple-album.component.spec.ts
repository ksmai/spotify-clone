/* tslint:disable max-classes-per-file */
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import {
  FakePlayerService,
  FakeRouter,
  FakeRouterLink,
  FakeSearchHistoryService,
  testAlbum,
} from '../../../test-utils/';
import { PlayerService } from '../../core/player.service';
import { SearchHistoryService } from '../../core/search-history.service';
import { MaterialModule } from '../material.module';
import { SimpleAlbumComponent } from './simple-album.component';

const album = testAlbum();

@Component({
  template: `
    <spot-simple-album
      [album]="album"
      [emitColor]="emitColor"
      [matchAlbum]="matchAlbum"
      [isPlayable]="isPlayable"
      [isPlaying]="isPlaying"
      [isEmpty]="isEmpty"
    ></spot-simple-album>
  `,
})
class DummyComponent {
  album = album;
  emitColor = false;
  matchAlbum = false;
  isPlayable = false;
  isPlaying = false;
  isEmpty = false;
}

class Page {
  albumName: DebugElement;
  artistNames: DebugElement[];
  playButton: DebugElement;
  pauseButton: DebugElement;
  hostElement: DebugElement;

  playSpy: jasmine.Spy;
  pauseSpy: jasmine.Spy;
  playAlbumSpy: jasmine.Spy;
  playAlbumIDSpy: jasmine.Spy;

  constructor() {
    const fakePlayerService: FakePlayerService = TestBed
      .get(PlayerService) as any as FakePlayerService;

    this.playSpy = spyOn(fakePlayerService, 'play');
    this.pauseSpy = spyOn(fakePlayerService, 'pause');
    this.playAlbumSpy = spyOn(fakePlayerService, 'playAlbum')
      .and.returnValue(Promise.resolve(true));
    this.playAlbumIDSpy = spyOn(fakePlayerService, 'playAlbumWithID')
      .and.returnValue(Promise.resolve(true));
  }

  createElements() {
    this.albumName = fixture.debugElement.query(By.css('.name'));
    this.artistNames = fixture.debugElement.queryAll(By.css('.artist'));
    this.playButton = fixture.debugElement.query(By.css('.play'));
    this.pauseButton = fixture.debugElement.query(By.css('.pause'));
    this.hostElement = fixture.debugElement
      .query(By.directive(SimpleAlbumComponent));
  }

  callMethod(methodName: string, ...args: any[]) {
    const instance = this.hostElement.injector.get(SimpleAlbumComponent);

    return instance[methodName](...args);
  }
}

let fixture: ComponentFixture<DummyComponent>;
let component: DummyComponent;
let page: Page;

function createComponent() {
  fixture = TestBed.createComponent(DummyComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('SimpleAlbumComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
        ],
        declarations: [
          DummyComponent,
          SimpleAlbumComponent,
          FakeRouterLink,
        ],
        providers: [
          { provide: Router, useClass: FakeRouter },
          { provide: PlayerService, useClass: FakePlayerService },
          {
            provide: SearchHistoryService,
            useClass: FakeSearchHistoryService,
          },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should show album name', () => {
    expect(page.albumName.nativeElement.textContent).toContain(album.name);
  });

  it('should show artist names', () => {
    page.artistNames.forEach((artistName: DebugElement, idx: number) => {
      expect(artistName.nativeElement.textContent)
        .toContain(album.artists[idx].name);
    });
  });

  it('should apply class and hide buttons when the album is empty', () => {
    component.isEmpty = true;
    fixture.detectChanges();
    page.createElements();
    if (page.playButton) {
      expect(page.playButton.nativeElement.offsetParent).toEqual(null);
    }
    if (page.pauseButton) {
      expect(page.pauseButton.nativeElement.offsetParent).toEqual(null);
    }
    expect(page.hostElement.nativeElement.classList.contains('empty-album'))
      .toBe(true);
  });

  it('should apply a class and show pause button when playing', () => {
    component.isPlaying = true;
    fixture.detectChanges();
    page.createElements();
    expect(page.playButton).toBeFalsy();
    expect(page.pauseButton).toBeTruthy();
    expect(page.hostElement.nativeElement.classList.contains('playing'))
      .toBe(true);
  });

  it('should show play button when not playing', () => {
    component.isPlaying = false;
    fixture.detectChanges();
    page.createElements();
    expect(page.playButton).toBeTruthy();
    expect(page.pauseButton).toBeFalsy();
    expect(page.hostElement.nativeElement.classList.contains('playing'))
      .toBe(false);
  });

  it('should just call play when album matches', () => {
    component.matchAlbum = true;
    fixture.detectChanges();
    page.callMethod('play');
    expect(page.playSpy).toHaveBeenCalled();
  });

  it('should just play the albumData when album is playable', () => {
    component.matchAlbum = false;
    component.isPlayable = true;
    fixture.detectChanges();
    page.callMethod('play');
    expect(page.playAlbumSpy).toHaveBeenCalledWith(album);
  });

  it('should just query the album ID if not match/playable', () => {
    component.matchAlbum = false;
    component.isPlayable = false;
    fixture.detectChanges();
    page.callMethod('play');
    expect(page.playAlbumIDSpy).toHaveBeenCalledWith(album.id);
  });

  it('should pause', () => {
    page.callMethod('pause');
    expect(page.pauseSpy).toHaveBeenCalled();
  });
});
