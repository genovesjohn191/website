import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RoleData } from '../../../../shared/interfaces/role-model';
import { FormConfig } from '../../../../shared/interfaces/form-model';
import { UserManagementService } from '../user-management-service/user-management.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [TableComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements AfterViewInit {
  link = "usermanagement/role-management";
  module = 'role';
  icon = '/assets/Images/Hierarchy.png';
  loading: boolean = false;


  data: RoleData[] = [];
  
  myColumns = [
    { key: 'description', header: 'Description' },
    { key: 'roleCode', header: 'Code' }, // changed from code to roleCode
    { key: 'roleName', header: 'Role Name' },

    { key: 'actions', header: 'Actions' }
  ];

  createModalData: FormConfig = {

    title: 'Role Create',
    fields: [
      { key: 'roleCode', label: 'Role Code', type: 'text', required: true },
      { key: 'roleName', label: 'Role Name', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'text', fullWidth: true },
      // {
      //   key: 'status',
      //   label: 'Status',
      //   type: 'select',
      //   selectOptions: ['Active', 'Inactive'],
      //   required: true
      // },
    ],
    policies: [
      { rolePolicyName: 'Role', options: ['CanCreate', 'CanEdit', 'CanView', 'CanDelete', 'CanRestore'] },
      { rolePolicyName: 'Employee', options: ['CanCreate', 'CanEdit', 'CanView', 'CanDelete', 'CanRestore'] },
      { rolePolicyName: 'User Account', options: ['CanCreate', 'CanEdit', 'CanView', 'CanDelete', 'CanRestore'] },
      { rolePolicyName: 'Section Formatting', options: ['CanCreate', 'CanEdit', 'CanView', 'CanDelete', 'CanRestore'] },
      { rolePolicyName: 'Email Template', options: ['CanCreate', 'CanEdit', 'CanView', 'CanDelete', 'CanRestore'] },
      { rolePolicyName: 'Career Vacancies', options: ['CanCreate', 'CanEdit', 'CanView', 'CanDelete', 'CanRestore'] },
      { rolePolicyName: 'Applicants', options: ['CanCreate', 'CanEdit', 'CanView', 'CanDelete', 'CanRestore'] }
    ]

  };


  constructor(private service: UserManagementService, private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.getRoleList();
  }


  onSubmit(data: any, mode: string): void {
    this.loading = true;
    if(mode == "create"){
      this.service.createRole(data).subscribe({
        next: (data) => {
          if (data && data.message) {
            this.showSnackBar(data.message);
            this.getRoleList();
          } else if (data == null) {
            this.showSnackBar('Error creating role. Please try again.');
          }
        },
        error: (error) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }else if(mode =="edit"){

      console.log(data)
      this.service.updateRole(data).subscribe({
        next: (data) => {
          if (data && data.message) {
            this.showSnackBar(data.message);
            this.getRoleList();
          } else if (data == null) {
            this.showSnackBar('Error updating role. Please try again.');
          }
        },
        error: (error) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }

  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  getRoleList() {
    this.service.getRole().subscribe(data => {
      this.data = data
      console.log(this.data)
    })
    
  }


}
