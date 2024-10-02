import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RestoreTableComponent } from '../../../../shared/components/restore-table/restore-table.component';
import { RoleData } from '../../../../shared/interfaces/role-model';
import { FormConfig } from '../../../../shared/interfaces/form-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RoleService } from '../user-management-service/Role/role.service';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [TableComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule,
    RestoreTableComponent
  ],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements AfterViewInit {
  link = "usermanagement/role-management";
  module = 'role';
  icon = '/assets/Images/Hierarchy.png';
  loading: boolean = false;
  isRestore: boolean =false;
  deletedData : RoleData[] = [];
  data: RoleData[] = [];
  UserId = localStorage.getItem("userId")
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


  constructor(private _roleService: RoleService, private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.getRoleList();
    this.getDeletedRole();
  }


  onSubmit(data: any, mode: string): void {
    this.loading = true;
    console.log(data,mode)

    switch (mode) {
      case "create":
        this.createRole(data);
        this.loading = false;
        break;
      case "edit":
        this.updateRole(data);
        this.loading = false;
        break;
      case "delete":
        this.deleteRole(data.roleId);
        this.loading = false;
        break;
      case "restore":
        this.restoreRole(data.roleId);
        this.loading = false;
        break;
      default:
        console.warn("Invalid mode:", mode);
        this.loading = false;
    }

  }

  updateRole(data:any){
    this._roleService.updateRole(data).subscribe({
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

  restoreRole(data:any){
    console.log(this.UserId) 
    this._roleService.restoreRole(data, Number(this.UserId)).subscribe({
      next: (data) => {
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getRoleList();
          this.getDeletedRole();
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

  deleteRole(roleId){
    this._roleService.deleteRole(roleId, Number(this.UserId)).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getRoleList();
          this.getDeletedRole();
        } else if (data == null) {
          this.showSnackBar('Error deleting role. Please try again.');
        }
      },
      error: (error) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  createRole(data:any){
    this._roleService.createRole(data, Number(this.UserId)).subscribe({
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
  }

  onIsRestoreChange(newIsRestoreValue: boolean) {
    this.isRestore = newIsRestoreValue;
    // console.log(this.isRestore)
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  getRoleList() {
    this._roleService.getRole().subscribe(data => {
      this.data = data
    })
  }

  getDeletedRole() {
    this._roleService.getDeletedRole().subscribe(data => {
      this.deletedData = data
    })
  }



}
