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
  testArtist,
} from '../../../test-utils/';
import { PlayerService } from '../../core/player.service';
import { SearchHistoryService } from '../../core/search-history.service';
import { MaterialModule } from '../../shared/material.module';
import { SimpleArtistComponent } from './simple-artist.component';

const artist = testArtist();

@Component({
  template: `
    <spot-simple-artist
      [artist]="artist"
      [matchArtist]="matchArtist"
      [isPlaying]="isPlaying"
      [isEmpty]="isEmpty"
    ></spot-simple-artist>
  `,
})
class DummyComponent {
  artist = artist;
  matchArtist = false;
  isPlaying = false;
  isEmpty = false;
}

class Page {
  image: DebugElement;
  name: DebugElement;
  playButton: DebugElement;
  pauseButton: DebugElement;
  hostElement: DebugElement;

  playSpy: jasmine.Spy;
  playIDSpy: jasmine.Spy;
  pauseSpy: jasmine.Spy;

  constructor() {
    const fakePlayerService: FakePlayerService = TestBed
      .get(PlayerService) as any as FakePlayerService;
    this.playSpy = spyOn(fakePlayerService, 'play');
    this.playIDSpy = spyOn(fakePlayerService, 'playArtistWithID')
      .and.returnValue(Promise.resolve(true));
    this.pauseSpy = spyOn(fakePlayerService, 'pause');
  }

  createElements() {
    this.image = fixture.debugElement.query(By.css('.image'));
    this.name = fixture.debugElement.query(By.css('.name'));
    this.playButton = fixture.debugElement.query(By.css('.play'));
    this.pauseButton = fixture.debugElement.query(By.css('.pause'));
    this.hostElement = fixture.debugElement
      .query(By.directive(SimpleArtistComponent));
  }

  callMethod(methodName: string, ...args: any[]) {
    const instance = this.hostElement.injector.get(SimpleArtistComponent);

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

describe('SimpleArtistComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
        ],
        declarations: [
          DummyComponent,
          SimpleArtistComponent,
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

  it('should show image and name of artist', () => {
    expect(page.name.nativeElement.textContent).toContain(artist.name);
    expect(page.image.nativeElement.src).toContain(artist.images[0].url);
  });

  it('should apply class and show pause button when playing', () => {
    component.isPlaying = true;
    fixture.detectChanges();
    page.createElements();
    expect(page.playButton).toBeFalsy();
    expect(page.pauseButton).toBeTruthy();
    expect(page.hostElement.nativeElement.classList.contains('playing'))
      .toBe(true);
  });

  it('should apply no class and show play button when not playing', () => {
    component.isPlaying = false;
    fixture.detectChanges();
    page.createElements();
    expect(page.playButton).toBeTruthy();
    expect(page.pauseButton).toBeFalsy();
    expect(page.hostElement.nativeElement.classList.contains('playing'))
      .toBe(false);
  });

  it('should apply class if isEmpty', () => {
    component.isEmpty = true;
    fixture.detectChanges();
    expect(
      page.hostElement.nativeElement.classList.contains('empty-artist'),
    )
      .toBe(true);
  });

  it('should just play if matched', () => {
    component.matchArtist = true;
    fixture.detectChanges();
    page.callMethod('play');
    expect(page.playSpy).toHaveBeenCalled();
  });

  it('should query for artist ID if not matched', () => {
    component.matchArtist = false;
    fixture.detectChanges();
    page.callMethod('play');
    expect(page.playIDSpy).toHaveBeenCalled();
  });

  it('should pause', () => {
    page.callMethod('pause');
    expect(page.pauseSpy).toHaveBeenCalled();
  });
});
