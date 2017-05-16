import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ResultListComponent } from './result/result-list.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    SearchRoutingModule,
    SharedModule,
  ],

  declarations: [
    SearchComponent,
    ResultListComponent,
  ],

  exports: [
    ResultListComponent,
  ],
})
export class SearchModule {
}
