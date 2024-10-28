import { ChangeDetectorRef, Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormConfig } from '../../../../shared/interfaces/form-model';
import { Emailtemplate } from '../../../../shared/interfaces/emailtemplate-model';
import { EmailTemplateService } from '../../user-management/user-management-service/Email-Template/email-template.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RestoreTableComponent } from '../../../../shared/components/restore-table/restore-table.component';
import { CommonModule } from '@angular/common';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-email-template',
  standalone: true,
  imports: [TableComponent,RestoreTableComponent,CommonModule],
  templateUrl: './email-template.component.html',
  styleUrl: './email-template.component.css'
})
export class EmailTemplateComponent {
  link = "system-setup/email-template/"
  module = 'email template'
  data: Emailtemplate[] = [];
  deletedData : Emailtemplate[];
  loading: boolean = false;
  isRestore: boolean = false;
  createModalData!: FormConfig;
  UserId = localStorage.getItem('userId');
  emailTemplateId : any;
  categorySelect: Emailtemplate[] = [];

  myColumns = [
    { key: 'category', header: 'Category' },
    { key: 'senderProject', header: 'Sender Project' },
    { key: 'recipient', header: 'Receiver' },
    { key: 'emailSubject', header: 'Email Subject' },
    { key: 'createdDate', header: 'Created Date' },
    { key: 'actions', header: 'Actions' }
  ];

   

  constructor(private _emailTemplate:EmailTemplateService, private changeDetectorRef: ChangeDetectorRef ,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void{    
    this.getEmailTemplate();
    this.getOptionList();
    this.getDeletedEmailTemp();                                         
  }

  onSubmit(data: any, mode: string): void {
    console.log(mode, data)
    this.loading = true;
    if (mode === 'create') {
      this.createEmailTemplate(data)
    } else if (mode ==='restore'){
      console.log(data,'restore')
      this.restoreEmailTemp(data.emailTemplateId)
    } else if (mode === 'delete'){
      this.deleteEmailTemp(data.emailTemplateId)
    }
    else if (mode === 'edit'){
      console.log(data,'editB')
      this.UpdateEmaiLTemp(data);
    }
    this.loading = false;
  }

  getOptionList(){
    let selectCategoryOptions: { value: string; label: string }[] = [];

    this._emailTemplate.getCategory().subscribe((category) => {      
        this.categorySelect = category;
        console.log("Category",category);
        selectCategoryOptions = this.categorySelect.map(category => ({
          value: category.category,
          label: category.category,
        }));
      this.createModalData = {
        title: 'Email Template Create',
        fields: [
          { key: 'category', label: 'Category', type: 'select', selectOptions: selectCategoryOptions, required: true },
          { key: 'senderProject', label: 'Sender Project', type: 'text', required: true },
          { key: 'recipient', label: 'Recipient', type: 'text', required: true },
          { key: 'emailSubject', label: 'Email Subject', type: 'text', required: true },
        ]
      };
      this.changeDetectorRef.detectChanges();
    });
  }

  createEmailTemplate(data: any){
    console.log("DataCreate",data);
    const form = {
      category: data.category,
      senderProject: data.senderProject,
      recipient: data.recipient,
      emailSubject : data.emailSubject,
      createdByUserId : this.UserId,
      isActive : true
    };
    console.log("CreateForm1",form);
    this._emailTemplate.createEmailTemplate(form).subscribe({
      next: (data) => {
        console.log(data.message,"Data Message");
        if (data && data.message){
            this.getEmailTemplate();
            this.showSnackBar(data.message);
            this.loading = false;
        }
        else if(data == null){
          this.showSnackBar('Error creating user. Please try again.');
        }
      },
      error: (error) => {
        this.loading = false;
      },
      complete: () => {     
        this.loading = false
      }      
    })
  }
  
  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  getEmailTemplate() {
    this._emailTemplate.getEmailTemplate().subscribe(data => {
      this.data = data;
    })
  } 

  restoreEmailTemp(emailTemplateId:any){
    this._emailTemplate.restoreEmailTemplate(emailTemplateId, this.UserId).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getEmailTemplate();
          this.getDeletedEmailTemp();
        } else if (data == null) {
          this.showSnackBar('Error restore email template. Please try again.');
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

  UpdateEmaiLTemp(data: any){
    const form = {
      category : data.category,
      senderProject: data.senderProject,
      recipient: data.recipient,
      emailSubject : data.emailSubject,
      createdByUserId : this.UserId,
    };
    console.log("Form Update",form);
    this._emailTemplate.updateEmailTemplate(form).subscribe({     
      next: (data) => {

        console.log(data.message,"Data Message");
        if (data && data.message){
            this.getEmailTemplate();
            this.showSnackBar(data.message);
            this.loading = false;
        }
        else if(data == null){
          this.showSnackBar('Error updating user. Please try again.');
        }
      },
      error: (error) => {
        this.loading = false;
      },
      complete: () => {     
        this.loading = false
      }      
    })
  }

  deleteEmailTemp(emailTemplateId:any){
    console.log(emailTemplateId,"emailTemplateId");
    this._emailTemplate.deleteEmailTemp(emailTemplateId, this.UserId).subscribe({
      next:(data)=>{
        if (data && data.message) {
          this.showSnackBar(data.message);
          this.getEmailTemplate();
          this.getDeletedEmailTemp();
        } else if (data == null) {
          this.showSnackBar('Error deleting email template. Please try again.');
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

  getDeletedEmailTemp(){   
    this._emailTemplate.getDeletedETemplate().subscribe(data => {
      console.log("data",data);
      this.deletedData = data;
    })
  }

  onIsRestoreChange(newIsRestoreValue: boolean) {
    console.log("newIsRestoreValue",newIsRestoreValue);
    this.isRestore = newIsRestoreValue;
    // console.log(this.isRestore)
  }
}
