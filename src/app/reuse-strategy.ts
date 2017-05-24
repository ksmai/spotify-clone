import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

/* reuse the SearchComponent instead of recreating it */
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private detachedRouteHandle: DetachedRouteHandle;

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.url.length === 0;
  }

  store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandle,
  ): void {
    this.detachedRouteHandle = detachedTree;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig &&
      this.shouldDetach(route) &&
      !!this.detachedRouteHandle;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    if (!route.routeConfig) {
      return null;
    }

    return this.detachedRouteHandle;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    return false;
  }
}
