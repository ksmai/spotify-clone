import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpModule,
  ],

  providers: [
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule should only be imported once');
    }
  }
}
