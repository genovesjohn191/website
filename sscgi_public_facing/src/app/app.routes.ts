import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { AcquisitionResourcesPageComponent } from './features/Home Grown Solutions/acquisition-resources-page/acquisition-resources-page.component';
import { DynamicPageComponent } from './features/dynamic-page/dynamic-page.component';
import { NavPageComponent } from './features/dynamic-page/nav-page/nav-page.component';
import { CareerPageComponent } from './features/dynamic-page/career-page/career-page.component';
import { ReadMoreComponent } from './features/dynamic-page/career-page/read-more/read-more.component';
import { ApplyFormComponent } from './features/dynamic-page/career-page/apply-form/apply-form.component';

export const routes: Routes = [
    { path: 'careers', component: CareerPageComponent },
    { path: 'careers-readmore', component: ReadMoreComponent },
    { path: 'form', component: ApplyFormComponent },
    { path: ':name', component: NavPageComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DynamicPageComponent },
   


];
