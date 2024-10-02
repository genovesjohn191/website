import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormConfig } from '../../../../shared/interfaces/form-model';
import { Employee } from '../../../../shared/interfaces/employee-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../user-management-service/Employee/employee.service';
import { RestoreTableComponent } from '../../../../shared/components/restore-table/restore-table.component';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [TableComponent,
    RestoreTableComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent {
  link = "user-management/employee-management/"
  module = 'employee'
  icon = '/assets/Images/Badge.png'
  data: Employee[] = [];
  deletedData: Employee[];
  loading: boolean = false;
  personId:any;
  isRestore: boolean = false;
  UserId = localStorage.getItem('userId');
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

  constructor(private _personService: EmployeeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getPeople();
    this.getDeletedPeople();
  }

  getPeople() {
    this._personService.getPeople().subscribe(data => {
      this.data = data;
    })
  }

  getDeletedPeople(){
    this._personService.getDeletedPeople().subscribe(data => {
      this.deletedData = data;
    })
  }

  onSubmit(data: any, mode: string): void {
    console.log(mode, data)
    this.loading = true;
    if (mode === 'create') {
      this.createPerson(data)
    } else if (mode === 'edit') {
      this.updatePerson(data)
    } else if (mode === 'delete'){
      this.deletePerson(data.personId)
    } else if (mode ==='restore'){
      this.restorePerson(data.personId)
    }
    this.loading = false;
  }

  deletePerson(personId:any){
    this._personService.deletePerson(personId, this.UserId).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getPeople();
          this.getDeletedPeople();
        } else if (data == null) {
          this.showSnackBar('Error deleting person. Please try again.');
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

  restorePerson(personId:any){
    this._personService.restorePerson(personId, this.UserId).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getPeople();
          this.getDeletedPeople();
        } else if (data == null) {
          this.showSnackBar('Error restore person. Please try again.');
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

  createPerson(data: any){
    let form = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      employeeNumber: data.employeeNumber,
      contactNumber: data.contactNumber,
      email: data.email,
      address: data.address,
      Policies: data.Policies || [], // Ensure Policies is an array
      createdByUserId: this.UserId
    };
    // Call the service method with the updated form
    this._personService.createPeople(form).subscribe({
      next: (response) => {
        if (response && response.message) {
          this.showSnackBar(response.message);
          this.getPeople();
        } else if (response == null) {
          this.showSnackBar('Error creating Person. Please try again.');
        }
      },
      error: (error) => {
        this.showSnackBar("The email address is already in use. Please use a different email.");
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  updatePerson(data:any){
    let form = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      employeeNumber: data.employeeNumber,
      contactNumber: data.contactNumber,
      email: data.email,
      address: data.address,
      Policies: data.Policies || [], // Ensure Policies is an array
      updatedByUserId: this.UserId
    };
    console.log(localStorage.getItem("personId"))
    this._personService.updatePeople(form).subscribe({
      next: (response) => {
        if (response && response.message) {
          this.showSnackBar(response.message);
          this.getPeople();
          this.personId = localStorage.getItem("personId")
          this.getPeopleById(this.personId)
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

  getPeopleById(personId:any){
    this._personService.getPeopleById(personId).subscribe(data=>{
      console.log(data)
    })
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



}
