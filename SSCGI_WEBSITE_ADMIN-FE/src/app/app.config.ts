<<<<<<< HEAD
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
=======
import { ApplicationConfig, provideZoneChangeDetection,importProvidersFrom } from '@angular/core';
>>>>>>> master
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
<<<<<<< HEAD

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync()]
=======
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FilterBySearchPipe } from './shared/components/crudmodal/filter-by-search.pipe';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),importProvidersFrom(HttpClientModule,MatSnackBarModule,FilterBySearchPipe)]
>>>>>>> master
};
