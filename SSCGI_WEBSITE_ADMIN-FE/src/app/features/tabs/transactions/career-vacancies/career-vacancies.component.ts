import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormConfig } from '../../../../shared/interfaces/form-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestoreTableComponent } from '../../../../shared/components/restore-table/restore-table.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-career-vacancies',
  standalone: true,
  imports: [
    CommonModule,
    RestoreTableComponent,
    TableComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './career-vacancies.component.html',
  styleUrl: './career-vacancies.component.css'
})
export class CareerVacanciesComponent implements OnInit {

  link = "usermanagement/user-account";
  module = "Career Vacancies";
  icon = '/assets/Images/User.png';
  loading: boolean = false;
  data: any = [];
  createModalData!: FormConfig;
  isRestore: boolean = false;
  deletedData: any;
  UserId = localStorage.getItem("userId")
  myColumns = [
    { key: 'jobTitle', header: 'Job Title' },
    { key: 'shortDescription', header: 'Short Description' },
    { key: 'whatAreWeLookingFor', header: 'What Are We LookingFor' },
    { key: 'fullJobDescription', header: 'Full Job Description' },
    { key: 'qualification', header: 'Qualification' },
    { key: 'displayStatus', header: 'Status' },
    { key: 'actions', header: 'Actions' }
  ];
  constructor(private snackBar: MatSnackBar, private service: TransactionService) { }

  ngOnInit(): void {
    this.getAllCareer();
    this.getAllInActiveCareer();
    this.createModal();
  }


  getAllCareer() {
    this.service.getCareer().subscribe(data => {
      this.data = data.map(item => ({
        ...item,
        displayStatus: item.status ? 'Active' : 'Inactive' // Map boolean to "Active" or "Inactive"
      }));
    });
  }

  getAllInActiveCareer() {
    this.service.getCareerInActive().subscribe(data => {
      this.deletedData = data.map(item => ({
        ...item,
        displayStatus: item.status ? 'Active' : 'Inactive' // Map boolean to "Active" or "Inactive"
      }));
    });
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
      console.log(data,'sdasd')
      this.updateCareer(data)
    } else if (mode === 'delete') {
      this.deleteCareer(data.careerId)
    } else if (mode === 'restore') {
      this.restoreCareer(data.careerId)
    }
  }

  createCareer(data: any) {
    console.log(data)
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const form = {
      jobTitle: data.jobTitle,
      shortDescription: data.shortDescription,  
      whatAreWeLookingFor: data.whatAreWeLookingFor,  
      fullJobDescription: data.fullJobDescription,  
      qualification: data.qualification,  
      status: data.status,
      ImageURL:data.ImageURL,  
      createdByUserId: userId 

    };

    this.service.createCareer(form).subscribe({
      next: (data) => {
        console.log(form)
        if (data && data.message) {
          this.getAllCareer();
          this.getAllInActiveCareer();
          this.showSnackBar(data.message);
          // this.loading = false;
        } else if (data == null) {
          this.showSnackBar('Error creating career. Please try again.');
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

  deleteCareer(careerId){
    this.service.deleteCareer(careerId, this.UserId).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getAllCareer();
          this.getAllInActiveCareer();
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

 restoreCareer(careerId){
    this.service.restoreCareer(careerId, this.UserId).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getAllCareer();
          this.getAllInActiveCareer();
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

  updateCareer(data:any){
    console.log(data)
    const form = {
      jobTitle: data.jobTitle,
      shortDescription: data.shortDescription,
      whatAreWeLookingFor: data.whatAreWeLookingFor,
      fullJobDescription:data.fullJobDescription,
      qualification: data.qualification,
      status: data.status,
      ImageURL:data.ImageURL,
      updatedByUserId: this.UserId,
    };

    this.service.updateCareer(form, data.careerID).subscribe({
      next: (data) => {
        console.log(form)
        if (data && data.message) {
          this.getAllCareer();
          this.showSnackBar(data.message);
          this.loading = false;
        } else if (data == null) {
          this.showSnackBar('Error updating career. Please try again.');
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
      title: 'User Account Create',
      fields: [
        { key: 'jobTitle', label: 'Job Title', type: 'text', required: true },
        { key: 'shortDescription', label: 'Short Description', type: 'text', required: true },
        { key: 'whatAreWeLookingFor', label: 'What Are We Looking For', type: 'text', required: true, fullWidth: true},
        { key: 'fullJobDescription', label: 'Full Job Description', type: 'textarea', required: true, fullWidth: true },
        { key: 'qualification', label: 'Qualification', type: 'textarea', required: true, fullWidth: true },
        { key: 'status', label: 'Status', type: 'select', selectOptions: selectRoleOptions, required: true },
        { key: 'ImageURL', label: 'Upload Photo', type: 'file', required: true, fullWidth:true }, 
      ],
    }



  }

}
