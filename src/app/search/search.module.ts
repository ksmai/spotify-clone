import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ResultListComponent } from './result-list/result-list.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { TopResultComponent } from './top-result/top-result.component';

@NgModule({
  imports: [
    SearchRoutingModule,
    SharedModule,
  ],

  declarations: [
    SearchComponent,
    ResultListComponent,
    TopResultComponent,
  ],

  exports: [
    ResultListComponent,
    TopResultComponent,
  ],
})
export class SearchModule {
}
