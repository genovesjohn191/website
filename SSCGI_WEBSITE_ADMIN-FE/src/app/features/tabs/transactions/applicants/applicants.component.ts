import { Component } from '@angular/core';
import { FormConfig } from '../../../../shared/interfaces/form-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionService } from '../transaction.service';
import { CommonModule } from '@angular/common';
import { RestoreTableComponent } from '../../../../shared/components/restore-table/restore-table.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [CommonModule,
    RestoreTableComponent,
    TableComponent,
    MatProgressSpinnerModule],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css'
})
export class ApplicantsComponent {

  link = "usermanagement/user-account";
  module = "Applicants";
  icon = '/assets/Images/User.png';
  loading: boolean = false;
  data: any = [];
  createModalData!: FormConfig;
  isRestore: boolean = false;
  deletedData: any;
  UserId = localStorage.getItem("userId")
  applicants: any[] = [];
  myColumns = [
    { key: 'jobTitle', header: 'Job Title' },
    { key: 'name', header: 'Name' },
    { key: 'emailAddress', header: 'Email Address' },
    { key: 'phoneNumber', header: 'Phone Number' },
    { key: 'displayStatus', header: 'Status' },
    { key: 'downloadFile', header: 'Download File' }
  ];
  constructor(private snackBar: MatSnackBar, private service: TransactionService) { }

  ngOnInit(): void {
    this.getAllApplicant();
    this.getAllInActiveCareer();
    this.createModal();
  }


  getAllApplicant() {
    this.service.getApplicant().subscribe(data => {
      this.applicants = data;  // Store the response data in the array
      console.log(this.applicants);
  
      // Loop through the array to process each applicant
      this.applicants.forEach(applicant => {
        console.log(applicant);  // Access each applicant object
        // You can add more logic here to process each applicant's data
      });
    }, error => {
      console.error('Error fetching applicants:', error); // Handle any errors
    });
  }
  getAllInActiveCareer() {

  }

  onIsRestoreChange(newIsRestoreValue: boolean) {
    this.isRestore = newIsRestoreValue;
    // console.log(this.isRestore)
  }

  onSubmit(data: any, mode: string): void {
    this.loading = true;
    if (mode === 'create') {
      this.createCareer(data);
    } else if (mode === 'edit') {
      console.log(data, 'sdasd')
      this.updateCareer(data)
    } else if (mode === 'delete') {
      this.deleteCareer(data.careerId)
    } else if (mode === 'restore') {
      this.restoreCareer(data.careerId)
    }
  }

  createCareer(data: any) {

  }

  deleteCareer(careerId) {

  }

  restoreCareer(careerId) {

  }

  updateCareer(data: any) {

  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  createModal() {
    let selectRoleOptions: { value: boolean; label: string }[] = [];

    let statusOptions = [
      { value: true, label: 'Active' },
      { value: false, label: 'Inactive' }
    ];

    // Store the options directly for the dropdown and map to boolean representation
    selectRoleOptions = statusOptions.map(option => ({
      value: option.value,                // Keep value as number
      label: option.label,
      booleanValue: option   // Add a boolean representation
    }));
    this.createModalData = {
      title: 'Applicants Create',
      fields: [
        { key: 'jobTitle', label: 'Job Title', type: 'text', required: true },
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'emailAddress', label: 'Email Address', type: 'text', required: true, fullWidth: true },
        { key: 'phoneNumber', label: 'Phone Number', type: 'textarea', required: true, fullWidth: true },
        { key: 'status', label: 'Status', type: 'select', selectOptions: selectRoleOptions, required: true },

      ],
    }





  }
}
