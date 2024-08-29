import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { AcquisitionResourcesPageComponent } from './features/Home Grown Solutions/acquisition-resources-page/acquisition-resources-page.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent },
    { path: 'dev', component: AcquisitionResourcesPageComponent },

];
