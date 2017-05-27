import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';

import { FakeRouterLink } from '../../test-utils/';
import { CoreModule } from '../core/core.module';
import { PlayerHistoryService } from '../core/player-history.service';
import { PlayerService } from '../core/player.service';
import { MaterialModule } from '../shared/material.module';
import { SidenavComponent } from './sidenav.component';

let fixture: ComponentFixture<SidenavComponent>;
let component: SidenavComponent;

function createComponent() {
  fixture = TestBed.createComponent(SidenavComponent);
  component = fixture.componentInstance;

  return fixture.whenStable();
}

describe('SidenavComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
          CoreModule,
        ],
        declarations: [
          SidenavComponent,
          FakeRouterLink,
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

  it('should get player history on init', () => {
    const spy = spyOn(TestBed.get(PlayerHistoryService), 'getHistories')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should clear player history', () => {
    const spy = spyOn(TestBed.get(PlayerHistoryService), 'reset');
    component.clear();
    expect(spy).toHaveBeenCalled();
  });
});
