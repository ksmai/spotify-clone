import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { FakeRouterLink, testTrack } from '../../../test-utils/';
import { CoreModule } from '../../core/core.module';
import { PlayerService } from '../../core/player.service';
import { PlayerInfoComponent } from './player-info.component';

let fixture: ComponentFixture<PlayerInfoComponent>;
let component: PlayerInfoComponent;
let page: Page;

class Page {
  image: DebugElement;
  album: DebugElement;
  artists: DebugElement[];

  createElements() {
    this.image = fixture.debugElement.query(By.css('.image'));
    this.album = fixture.debugElement.query(By.css('.album'));
    this.artists = fixture.debugElement.queryAll(By.css('.artist'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(PlayerInfoComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('PlayerInfoComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          CoreModule,
        ],
        declarations: [
          FakeRouterLink,
          PlayerInfoComponent,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should get player status on init', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'getCurrentStatus')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should show currently playing track info', () => {
    const track = testTrack();
    const status = {
      track,
      paused: false,
      context: { type: track.album.type, id: track.album.id },
    };
    component.currentStatus = Observable.of(status);
    fixture.detectChanges();
    page.createElements();

    expect(page.image.nativeElement.src)
      .toContain(track.album.images[0].url);
    expect(page.album.nativeElement.textContent)
      .toContain(track.name);
    page.artists.forEach((artist, idx: number) => {
      expect(artist.nativeElement.textContent)
        .toContain(track.artists[idx].name);
    });
  });
});
