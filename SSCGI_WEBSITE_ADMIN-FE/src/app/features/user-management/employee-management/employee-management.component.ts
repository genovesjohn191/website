import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { FormConfig } from '../../../shared/interfaces/form-model';
import { UserManagementService } from '../user-management-service/user-management.service';
import { Employee } from '../../../shared/interfaces/employee-model';
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
  myData = [
    { firstName: "John", middleName: "", lastName: "Doe", employeeNumber: 123456789, contactNumber: "0912345678", email: "johndoe@gmail.com", address: "123 Main St" },
    { firstName: "Jane", middleName: "", lastName: "Smith", employeeNumber: 987654321, contactNumber: "0987654321", email: "janesmith@gmail.com", address: "456 Elm St" },
    { firstName: "Alice", middleName: "", lastName: "Johnson", employeeNumber: 112233445, contactNumber: "0911223344", email: "alicejohnson@gmail.com", address: "789 Maple Ave" },
    { firstName: "Bob", middleName: "", lastName: "Brown", employeeNumber: 556677889, contactNumber: "0955667788", email: "bobbrown@gmail.com", address: "101 Pine St" },
    { firstName: "Charlie", middleName: "", lastName: "Davis", employeeNumber: 667788990, contactNumber: "0966778899", email: "charliedavis@gmail.com", address: "202 Oak St" },
  ];

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
      { key: 'address', label: 'Address', type: 'text', fullWidth:true},
    ]
  };

  constructor(private service:UserManagementService , private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(){
    this.service.getPeople().subscribe(data=>{
      this.data = data;
    })
  }

  onSubmit(data: any): void {
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
    console.log('Submit event triggered:', form);

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
}


  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }



}
