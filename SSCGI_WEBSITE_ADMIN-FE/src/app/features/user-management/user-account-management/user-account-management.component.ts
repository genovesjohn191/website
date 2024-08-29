import { ChangeDetectorRef, Component } from '@angular/core';
import { RoleData } from '../../../shared/interfaces/role-model';
import { TableComponent } from '../../../shared/components/table/table.component';
import { FormConfig } from '../../../shared/interfaces/form-model';
import { UserAccount } from '../../../shared/interfaces/user-model';
import { UserManagementService } from '../user-management-service/user-management.service';
import { Employee } from '../../../shared/interfaces/employee-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account-management',
  standalone: true,
  imports: [
    TableComponent,
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

  myColumns = [
    { key: 'userId', header: 'UserId' },
    { key: 'name', header: 'Name' }, // changed from code to roleCode
    { key: 'roleName', header: 'Role' },
    { key: 'expireDate', header: 'Expiry Date' },
    { key: 'isLocked', header: 'isLocked' },
    { key: 'actions', header: 'Actions' }
  ];


  constructor(private service: UserManagementService, private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.getOptionList();
    this.getUserAccountList();
  }
  onSubmit(result: any): void {

    const form = {
      personId: result.person.value,
      roleId: result.roleId.value,
      expireDate: result.expiryDate,
      createdByUserId: 1433,
    };

    this.service.createUserAccount(form).subscribe({
      next: (data) => {
        if (data && data.message) {
          this.getUserAccountList();
          this.showSnackBar(data.message);
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
    this.service.getUserAccount().subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }

  getOptionList() {
    // Define the types for the select options
    let selectRoleOptions: { value: number; label: string }[] = [];
    let selectPersonOptions: { value: string; label: string }[] = []; // Changed to string

    // Fetch roles
    this.service.getRole().subscribe((data) => {
      this.roleSelect = data;
      selectRoleOptions = this.roleSelect.map(role => ({
        value: role.roleId,      // Assuming roleId is a number
        label: role.roleName     // Display name for the select option
      }));

      // Fetch people only after roles are fetched
      this.service.getPeople().subscribe((person) => {
        this.personSelect = person;
        selectPersonOptions = this.personSelect.map(person => ({
          value: person.personId,
          label: person.firstName + ' ' + person.middleName + ' ' + person.lastName,
        }));

        // Now both selectRoleOptions and selectPersonOptions are populated
        this.createModalData = {
          title: 'User Account Create',
          fields: [
            { key: 'person', label: 'Select Employee', type: 'select', selectOptions: selectPersonOptions, required: true, fullWidth: true },
            { key: 'roleId', label: 'Select Role', type: 'select', selectOptions: selectRoleOptions, required: true },
            { key: 'expiryDate', label: 'Expiry Date', type: 'date', required: true },
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
}
