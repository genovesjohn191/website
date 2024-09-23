import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { CustomRouteReuseStrategy } from './features/dynamic-page/nav-page/custom-route-reuse-strategy';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy } // Provide custom strategy
  ]
};
