import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormConfig } from '../../../../shared/interfaces/form-model';
import { UserManagementService } from '../user-management-service/user-management.service';
import { Employee } from '../../../../shared/interfaces/employee-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [TableComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent {
  link = "user-management/employee-management/"
  module = 'employee-management'
  icon = '/assets/Images/Badge.png'
  data: Employee[] = [];
  loading: boolean = false;

  myColumns = [
    { key: 'employeeNumber', header: 'Employee Number' },
    { key: 'name', header: 'Employee Name' },
    { key: 'contactNumber', header: 'Contact Number' },
    { key: 'email', header: 'Email' },
    { key: 'actions', header: 'Actions' }
  ];

  createModalData: FormConfig = {
    title: 'Employee Create',
    fields: [
      { key: 'firstName', label: 'First Name', type: 'text', required: true },
      { key: 'middleName', label: 'Middle Name', type: 'text' },
      { key: 'lastName', label: 'Last Name', type: 'text', required: true },
      { key: 'employeeNumber', label: 'Employee Number', type: 'text', required: true },
      { key: 'contactNumber', label: 'Contact Number', type: 'text' },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'address', label: 'Address', type: 'text', fullWidth: true },
    ]
  };

  constructor(private service: UserManagementService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    this.service.getPeople().subscribe(data => {
      this.data = data;
    })
  }

  onSubmit(data: any, mode: string): void {
    let createdByUserId = "143";
    let form = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      employeeNumber: data.employeeNumber,
      contactNumber: data.contactNumber,
      email: data.email,
      address: data.address,
      Policies: data.Policies || [], // Ensure Policies is an array
      createdByUserId: createdByUserId
    };

    this.loading = true;
    if (mode === 'create') {
      // Call the service method with the updated form
      this.service.createPeople(form).subscribe({
        next: (response) => {
          if (response && response.message) {
            this.showSnackBar(response.message);
            this.getPeople();
          } else if (response == null) {
            this.showSnackBar('Error creating Person. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else if (mode === 'edit') {
      console.log(localStorage.getItem("personId"))
      this.service.updatePeople(form).subscribe({
        next: (response) => {
          if (response && response.message) {
            this.showSnackBar(response.message);
            this.getPeople();
          } else if (response == null) {
            this.showSnackBar('Error updating Person. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });

    }
    this.loading = false;
  }


  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }



}
