import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { AcquisitionResourcesPageComponent } from './features/Home Grown Solutions/acquisition-resources-page/acquisition-resources-page.component';
import { DynamicPageComponent } from './features/dynamic-page/dynamic-page.component';
import { NavPageComponent } from './features/dynamic-page/nav-page/nav-page.component';

export const routes: Routes = [
    { path: ':name', component: NavPageComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DynamicPageComponent },


];
