/* tslint:disable */
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[routerLink]',
})
export class FakeRouterLink {
  @Input() routerLink: string;
}
