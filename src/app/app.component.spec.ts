import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { FakeRouter } from '../test-utils/';
import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
        ],
        providers: [
          { provide: Router, useClass: FakeRouter },
        ],
        schemas: [
          NO_ERRORS_SCHEMA,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should scroll after navigation', () => {
    const scrollSpy = spyOn(window, 'scrollTo');
    component.ngOnInit();
    expect(scrollSpy).toHaveBeenCalled();
  });
});
