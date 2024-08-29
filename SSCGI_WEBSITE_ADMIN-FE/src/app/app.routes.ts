import { Routes } from '@angular/router';
import { SectionFormattingComponent } from './features/system-setup/section-formatting/section-formatting.component';

import { EmailTemplateComponent } from './features/system-setup/email-template/email-template.component';
import { SectionCreateComponent } from './features/system-setup/section-formatting/section-create/section-create.component';
import { RoleManagementComponent } from './features/user-management/role-management/role-management.component';
import { EmployeeManagementComponent } from './features/user-management/employee-management/employee-management.component';
import { UserAccountManagementComponent } from './features/user-management/user-account-management/user-account-management.component';

export const routes: Routes = [
    { path: '', redirectTo: 'system-setup/section-formatting', pathMatch: 'full' },

    //Section formatting routes
    { path: 'system-setup/section-formatting', component: SectionFormattingComponent },
    { path: 'system-setup/section-formatting/create', component: SectionCreateComponent },

    //email template routes
    { path: 'system-setup/email-template', component: EmailTemplateComponent },

    //role management routes
    {path: 'user-management/role-management', component: RoleManagementComponent},

    //employee management routes
    {path: 'user-management/employee-management', component: EmployeeManagementComponent},

    {path: 'user-management/user-account', component: UserAccountManagementComponent},

    { path: '**', redirectTo: 'system-setup/section-formatting' },
];
