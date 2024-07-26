import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormConfig } from '../../interfaces/form-model';
import { CommonModule } from '@angular/common';
import { Employee } from '../../interfaces/employee-model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-view-modal',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInput, MatCheckboxModule],
  templateUrl: './view-modal.component.html',
  styleUrl: './view-modal.component.css'
})
export class ViewModalComponent {
  icon: string = 'assets/Images/View.png'
  module: string = ''
  details: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.details = data.details
    // console.log(this.details)
    const mod = data.module.split('-')
    this.module = mod[0]
  }

  fieldKeys(): string[] {
    const allKeys = Object.keys(this.details || {});
    const filteredKeys = allKeys.filter(key => key !== 'policies');
    // console.log(filteredKeys);
    return filteredKeys;
  }

  formatLabel(field: string): string {
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
  }

  getOptions(policy: any): { key: string, value: boolean }[] {
    return Object.keys(policy.options).map(optionKey => ({
      key: optionKey,
      value: policy.options[optionKey]
    }));
  }
}
