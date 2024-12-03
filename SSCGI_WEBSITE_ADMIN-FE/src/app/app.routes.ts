import { Routes } from '@angular/router';
import { SectionFormattingComponent } from './features/tabs/system-setup/section-formatting/section-formatting.component';

import { EmailTemplateComponent } from './features/tabs/system-setup/email-template/email-template.component';
import { SectionCreateComponent } from './features/tabs/system-setup/section-formatting/section-create/section-create.component';
import { RoleManagementComponent } from './features/tabs/user-management/role-management/role-management.component';
import { UserAccountManagementComponent } from './features/tabs/user-management/user-account-management/user-account-management.component';
import { SetPasswordPageComponent } from './features/auth/set-password-page/set-password-page.component';
import { TabsComponent } from './features/tabs/tabs.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './features/auth/auth.guard';
import { PageBuilderComponent } from './features/tabs/system-setup/section-formatting/page-builder/page-builder.component';
import { PageViewComponent } from './features/tabs/system-setup/section-formatting/page-builder/page-view/page-view.component';
import { DataPrivacyEditorComponent } from './features/tabs/system-setup/data-privacy-editor/data-privacy-editor.component';
import { DashboardComponent } from './features/tabs/dashboard/dashboard.component';
import { CareerVacanciesComponent } from './features/tabs/transactions/career-vacancies/career-vacancies.component';
import { ApplicantsComponent } from './features/tabs/transactions/applicants/applicants.component';
export const routes: Routes = [

    {      
        path: 'tabs',
        component: TabsComponent,
        children: [
            // Section formatting routes
            {path: 'dashboard', component:DashboardComponent},
            { path: 'system-setup/section-formatting', component: SectionFormattingComponent },
            { path: 'system-setup/section-formatting/create', component: SectionCreateComponent },
            { path: 'transactions/career-vacancies', component: CareerVacanciesComponent },
            { path: 'transactions/applicants', component: ApplicantsComponent },

            // Email template routes
            { path: 'system-setup/email-template', component: EmailTemplateComponent },

            // Role management routes
            { path: 'user-management/role-management', component: RoleManagementComponent },

            // User account management routes
            { path: 'user-management/user-account', component: UserAccountManagementComponent },

            { path: 'system-setup/section-formatting/page-builder',  component: PageBuilderComponent},
            { path: 'system-setup/section-formatting/data-privacy-editor',  component: DataPrivacyEditorComponent},

            // { path: 'system-setup/section-formatting/view-page',  component: PageViewComponent},

          
        ]
    },

    { path: 'set-password', component: SetPasswordPageComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: ':id', component: PageViewComponent },
    // { path: '**', redirectTo: 'system-setup/section-formatting' },

    
    


];
