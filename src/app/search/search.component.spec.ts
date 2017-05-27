import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';

import { CoreModule } from '../core/core.module';
import { SearchService } from '../core/search.service';
import { MaterialModule } from '../shared/material.module';
import { SearchComponent } from './search.component';

let fixture: ComponentFixture<SearchComponent>;
let component: SearchComponent;

function createComponent() {
  fixture = TestBed.createComponent(SearchComponent);
  component = fixture.componentInstance;

  return fixture.whenStable();
}

describe('SearchComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MaterialModule,
          CoreModule,
        ],
        declarations: [
          SearchComponent,
        ],
        schemas: [
          NO_ERRORS_SCHEMA,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should get loading status on init', () => {
    const spy = spyOn(TestBed.get(SearchService), 'getLoadingStatus')
      .and.returnValue(Observable.empty());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should send query on keyup', () => {
    spyOn(TestBed.get(SearchService), 'getLoadingStatus')
      .and.returnValue(Observable.empty());
    const spy = spyOn(TestBed.get(SearchService), 'nextQuery');
    const inputDe = fixture.debugElement.query(By.css('input'));
    inputDe.nativeElement.value = 'abc';
    inputDe.triggerEventHandler('keyup', {});
    expect(spy).toHaveBeenCalledWith('abc');
  });
});
