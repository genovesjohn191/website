import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false; // Do not allow detaching of any routes
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    // No storing of routes
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false; // Do not allow attaching of stored routes
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null; // No stored routes to retrieve
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Only reuse the route if the URLs match exactly, otherwise reload
    return future.routeConfig === curr.routeConfig;
  }
}
