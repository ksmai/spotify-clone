import { NgModule } from '@angular/core';
import {
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { CustomRouteReuseStrategy } from './reuse-strategy';

const routes: Routes = [
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [
    RouterModule,
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
})
export class AppRoutingModule {
}
