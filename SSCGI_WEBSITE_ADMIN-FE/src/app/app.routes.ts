import { Routes } from '@angular/router';
import { SectionFormattingComponent } from './features/tabs/system-setup/section-formatting/section-formatting.component';

import { EmailTemplateComponent } from './features/tabs/system-setup/email-template/email-template.component';
import { SectionCreateComponent } from './features/tabs/system-setup/section-formatting/section-create/section-create.component';
import { RoleManagementComponent } from './features/tabs/user-management/role-management/role-management.component';
import { EmployeeManagementComponent } from './features/tabs/user-management/employee-management/employee-management.component';
import { UserAccountManagementComponent } from './features/tabs/user-management/user-account-management/user-account-management.component';
import { SetPasswordPageComponent } from './features/set-password-page/set-password-page.component';
import { TabsComponent } from './features/tabs/tabs.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tabs/system-setup/section-formatting', pathMatch: 'full' },
    //Section formatting routes

    {
        path: 'tabs', 
        component: TabsComponent,
        children: [
          { path: '', redirectTo: 'system-setup/section-formatting', pathMatch: 'full' },
    
          // Section formatting routes
          { path: 'system-setup/section-formatting', component: SectionFormattingComponent },
          { path: 'system-setup/section-formatting/create', component: SectionCreateComponent },
    
          // Email template routes
          { path: 'system-setup/email-template', component: EmailTemplateComponent },
    
          // Role management routes
          { path: 'user-management/role-management', component: RoleManagementComponent },
    
          // Employee management routes
          { path: 'user-management/employee-management', component: EmployeeManagementComponent },
    
          // User account management routes
          { path: 'user-management/user-account', component: UserAccountManagementComponent },
        ]
      },

    {path:'set-password', component: SetPasswordPageComponent},

    // { path: '**', redirectTo: 'system-setup/section-formatting' },

    
];
