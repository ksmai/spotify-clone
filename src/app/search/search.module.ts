import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    SearchRoutingModule,
    SharedModule,
  ],

  declarations: [
    SearchComponent,
  ],
})
export class SearchModule {
}
