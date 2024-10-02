import { ChangeDetectorRef, Component } from '@angular/core';
import { RoleData } from '../../../../shared/interfaces/role-model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormConfig } from '../../../../shared/interfaces/form-model';
import { UserAccount } from '../../../../shared/interfaces/user-model';
import { Employee } from '../../../../shared/interfaces/employee-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { UserAccountService } from '../user-management-service/User-Account/user-account.service';
import { RoleService } from '../user-management-service/Role/role.service';
import { EmployeeService } from '../user-management-service/Employee/employee.service';
import { RestoreTableComponent } from '../../../../shared/components/restore-table/restore-table.component';

@Component({
  selector: 'app-user-account-management',
  standalone: true,
  imports: [
    TableComponent,
    RestoreTableComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './user-account-management.component.html',
  styleUrl: './user-account-management.component.css'
})
export class UserAccountManagementComponent {
  link = "usermanagement/user-account";
  module = "User Account";
  icon = '/assets/Images/User.png';
  loading: boolean = false;
  data: UserAccount[] = [];
  roleSelect: RoleData[] = [];
  personSelect: Employee[] = [];
  createModalData!: FormConfig;
  isRestore: boolean = false;
  deletedData: UserAccount[] = [];
  UserId = localStorage.getItem("userId")
  myColumns = [
    { key: 'userId', header: 'UserId' },
    { key: 'name', header: 'Name' }, // changed from code to roleCode
    { key: 'roleName', header: 'Role' },
    { key: 'expireDate', header: 'Expiry Date' },
    { key: 'isLocked', header: 'isLocked' },
    { key: 'actions', header: 'Actions' }
  ];


  constructor(private _roleService: RoleService, private _employeeService: EmployeeService,private _userAccService: UserAccountService, private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.getOptionList();
    this.getUserAccountList();
    this.getUserDeletedAccountList();
  }

  onSubmit(data: any, mode: string): void {
    console.log(mode, data)
    this.loading = true;
    if (mode === 'create') {
      this.createUserAccount(data)
    } else if (mode === 'edit') {
      console.log('Edit')
    } else if (mode === 'delete'){
      this.deleteUserAccount(data.userId)
    } else if (mode ==='restore'){
      this.restoreUserAccount(data.userId)
    }
    this.loading = false;
  }

  deleteUserAccount(userId){
    this._userAccService.deleteUserAccount(userId, this.UserId).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getUserAccountList();
          this.getUserDeletedAccountList();
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

  restoreUserAccount(userId){
    this._userAccService.restoreUserAccount(userId, this.UserId).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getUserAccountList();
          this.getUserDeletedAccountList();
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

  createUserAccount(data:any){
    const form = {
      personId: data[0].person.value,
      roleId: data[0].roleId.value,
      expireDate: data[0].expiryDate,
      createdByUserId: this.UserId,
    };

    this._userAccService.createUserAccount(form).subscribe({
      next: (data) => {

        console.log(this.loading)
        if (data && data.message) {
          this.getUserAccountList();
          this.showSnackBar(data.message);
          this.loading = false;
          ;
        } else if (data == null) {
          this.showSnackBar('Error creating user. Please try again.');
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

  getUserAccountList() {
    this._userAccService.getUserAccount().subscribe(data => {
      this.data = data;
    })
  }

  getUserDeletedAccountList() {
    this._userAccService.getDeletedUserAccount().subscribe(data => {
      this.deletedData =data;
    })
  }

  getOptionList() {
    // Define the types for the select options
    let selectRoleOptions: { value: number; label: string }[] = [];
    let selectPersonOptions: { value: string; label: string }[] = []; // Changed to string

    // Fetch roles
    this._roleService.getRole().subscribe((data) => {
      this.roleSelect = data;
      selectRoleOptions = this.roleSelect.map(role => ({
        value: role.roleId,      // Assuming roleId is a number
        label: role.roleName     // Display name for the select option
      }));

      // Fetch people only after roles are fetched
      this._employeeService.getPeople().subscribe((person) => {
        this.personSelect = person;
        selectPersonOptions = this.personSelect.map(person => ({
          value: person.personId,
          label: person.firstName + ' ' + person.middleName + ' ' + person.lastName,
        }));

        // Now both selectRoleOptions and selectPersonOptions are populated
        this.createModalData = {
          title: 'User Account Create',
          fields: [
            { key: 'personId', label: 'Select Employee', type: 'select', selectOptions: selectPersonOptions, required: true, fullWidth: true },
            { key: 'roleId', label: 'Select Role', type: 'select', selectOptions: selectRoleOptions, required: true },
            { key: 'expireDate', label: 'Expiry Date', type: 'date', required: true },
          ],
        };
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onIsRestoreChange(newIsRestoreValue: boolean) {
    this.isRestore = newIsRestoreValue;
    // console.log(this.isRestore)
  }
}
