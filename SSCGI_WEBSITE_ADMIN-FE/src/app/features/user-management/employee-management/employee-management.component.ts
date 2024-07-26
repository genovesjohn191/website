import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { FormConfig } from '../../../shared/interfaces/form-model';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent {
  link = "user-management/employee-management/"
  module = 'employee-management'
  icon = '/assets/Images/Badge.png'
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
      { key: 'address', label: 'Address', type: 'text' },
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
