import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';

import { CoreModule } from '../core/core.module';
import { PlayerService } from '../core/player.service';
import { PlayerComponent } from './player.component';

let fixture: ComponentFixture<PlayerComponent>;
let component: PlayerComponent;

function createComponent() {
  fixture = TestBed.createComponent(PlayerComponent);
  component = fixture.componentInstance;

  return fixture.whenStable();
}

describe('PlayerComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          CoreModule,
        ],
        declarations: [
          PlayerComponent,
        ],
        schemas: [
          NO_ERRORS_SCHEMA,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should get playlist on init', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'getPlaylist')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get the play requests on init', () => {
    const spy = spyOn(TestBed.get(PlayerService), 'getRequest')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should mute when volume > 0', () => {
    component.volume = 0.42;
    component.toggleMute();
    expect(component.volume).toEqual(0);
  });

  it('should unmute and restore previous volume', () => {
    component.volume = 0.42;
    component.toggleMute();
    expect(component.volume).toEqual(0);
    component.toggleMute();
    expect(component.volume).toEqual(0.42);
  });
});
