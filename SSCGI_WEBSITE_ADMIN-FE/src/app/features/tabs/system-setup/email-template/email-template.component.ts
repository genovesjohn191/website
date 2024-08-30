import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormConfig } from '../../../../shared/interfaces/form-model';

@Component({
  selector: 'app-email-template',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './email-template.component.html',
  styleUrl: './email-template.component.css'
})
export class EmailTemplateComponent {
  link = "system-setup/email-template/"
  module = 'email-template'
  myData = [
    { 
      category: 'Acknowledgement or Sales', 
      senderEmailProject: 'SSCGI Sales', 
      receiver: 'njbmission@sscgi.com', 
      receiverEmailSubject: '@SenderSubject', 
      createdDate: '2022-01-28 10:30:50.000' 
    },
    { 
      category: 'Reminder or Internal', 
      senderEmailProject: 'Reminder System', 
      receiver: 'internal@sscgi.com', 
      receiverEmailSubject: '@ReminderSubject', 
      createdDate: '2022-02-28 12:45:30.000' 
    },
    { 
      category: 'Notification or Marketing', 
      senderEmailProject: 'Marketing Department', 
      receiver: 'marketing@sscgi.com', 
      receiverEmailSubject: '@MarketingSubject', 
      createdDate: '2022-03-15 08:20:00.000' 
    },
    { 
      category: 'Feedback or Support', 
      senderEmailProject: 'Customer Support', 
      receiver: 'support@sscgi.com', 
      receiverEmailSubject: '@SupportSubject', 
      createdDate: '2022-04-10 14:00:15.000' 
    },
    { 
      category: 'Invoice or Billing', 
      senderEmailProject: 'Billing Department', 
      receiver: 'billing@sscgi.com', 
      receiverEmailSubject: '@BillingSubject', 
      createdDate: '2022-05-20 09:45:20.000' 
    },
    { 
      category: 'Reminder or Internal', 
      senderEmailProject: 'Reminder System', 
      receiver: 'internal@sscgi.com', 
      receiverEmailSubject: '@ReminderSubject', 
      createdDate: '2022-06-05 17:30:00.000' 
    },
    { 
      category: 'Acknowledgement or Sales', 
      senderEmailProject: 'SSCGI Sales', 
      receiver: 'njbmission@sscgi.com', 
      receiverEmailSubject: '@SenderSubject', 
      createdDate: '2022-07-12 11:10:45.000' 
    },
    { 
      category: 'Notification or Marketing', 
      senderEmailProject: 'Marketing Department', 
      receiver: 'marketing@sscgi.com', 
      receiverEmailSubject: '@MarketingSubject', 
      createdDate: '2022-08-18 13:20:30.000' 
    },
    { 
      category: 'Feedback or Support', 
      senderEmailProject: 'Customer Support', 
      receiver: 'support@sscgi.com', 
      receiverEmailSubject: '@SupportSubject', 
      createdDate: '2022-09-25 16:55:10.000' 
    },
    { 
      category: 'Invoice or Billing', 
      senderEmailProject: 'Billing Department', 
      receiver: 'billing@sscgi.com', 
      receiverEmailSubject: '@BillingSubject', 
      createdDate: '2022-10-30 10:05:00.000' 
    }
  ];

  myColumns = [
    { key: 'category', header: 'Category' },
    { key: 'senderEmailProject', header: 'Sender Project' },
    { key: 'receiver', header: 'Receiver' },
    { key: 'receiverEmailSubject', header: 'Email Subject' },
    { key: 'createdDate', header: 'Created Date' },
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
}
