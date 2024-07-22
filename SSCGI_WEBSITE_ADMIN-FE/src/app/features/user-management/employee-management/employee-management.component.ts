import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';

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
    { employeeNumber: 123456789, employeeName: "John Doe", contactNumber: "0912345678", email: "johndoe@gmail.com" },
    { employeeNumber: 987654321, employeeName: "Jane Smith", contactNumber: "0987654321", email: "janesmith@gmail.com" },
    { employeeNumber: 112233445, employeeName: "Alice Johnson", contactNumber: "0911223344", email: "alicejohnson@gmail.com" },
    { employeeNumber: 556677889, employeeName: "Bob Brown", contactNumber: "0955667788", email: "bobbrown@gmail.com" },
    { employeeNumber: 667788990, employeeName: "Charlie Davis", contactNumber: "0966778899", email: "charliedavis@gmail.com" },
    { employeeNumber: 223344556, employeeName: "David Evans", contactNumber: "0922334455", email: "davidevans@gmail.com" },
    { employeeNumber: 334455667, employeeName: "Ella Foster", contactNumber: "0933445566", email: "ellafoster@gmail.com" },
    { employeeNumber: 445566778, employeeName: "Frank Green", contactNumber: "0944556677", email: "frankgreen@gmail.com" },
    { employeeNumber: 556677889, employeeName: "Grace Harris", contactNumber: "0955667788", email: "graceharris@gmail.com" },
    { employeeNumber: 667788990, employeeName: "Hannah Irving", contactNumber: "0966778899", email: "hannahirving@gmail.com" },
    { employeeNumber: 778899001, employeeName: "Ivan Jones", contactNumber: "0977889900", email: "ivanjones@gmail.com" },
    { employeeNumber: 889900112, employeeName: "Jack Kelly", contactNumber: "0988990011", email: "jackkelly@gmail.com" },
    { employeeNumber: 990011223, employeeName: "Karen Lee", contactNumber: "0990011223", email: "karenlee@gmail.com" },
    { employeeNumber: 101112233, employeeName: "Liam Martin", contactNumber: "0910111223", email: "liammartin@gmail.com" },
    { employeeNumber: 111223344, employeeName: "Mia Nelson", contactNumber: "0911122334", email: "mianelson@gmail.com" },
    { employeeNumber: 122334455, employeeName: "Nina Oliver", contactNumber: "0912233445", email: "ninaoliver@gmail.com" },
    { employeeNumber: 133445566, employeeName: "Oliver Perry", contactNumber: "0913344556", email: "oliverperry@gmail.com" },
    { employeeNumber: 144556677, employeeName: "Paul Quinn", contactNumber: "0914455667", email: "paulquinn@gmail.com" },
    { employeeNumber: 155667788, employeeName: "Quincy Roberts", contactNumber: "0915566778", email: "quincyroberts@gmail.com" },
    { employeeNumber: 166778899, employeeName: "Rachel Scott", contactNumber: "0916677889", email: "rachelscott@gmail.com" },
  ];

  myColumns = [
    { key: 'employeeNumber', header: 'Employee Number' },
    { key: 'employeeName', header: 'Employee Name' },
    { key: 'contactNumber', header: 'Contact Number' },
    { key: 'email', header: 'Email' },
    { key: 'actions', header: 'Actions' }
  ];

  createModalData: any = {
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
