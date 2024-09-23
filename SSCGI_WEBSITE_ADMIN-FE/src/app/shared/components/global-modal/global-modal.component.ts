import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-global-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  templateUrl: './global-modal.component.html',
  styleUrl: './global-modal.component.css'
})
export class GlobalModalComponent {
  pageName: string = '';
  isDisplay: boolean = true;
  action: string = '';

  constructor(
    public dialogRef: MatDialogRef<GlobalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.action = data.action;
      this.pageName = data.pageName || '';
      this.isDisplay = data.isDisplay !== undefined ? data.isDisplay : true;
    }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close({ pageName: this.pageName, isDisplay: this.isDisplay });
  }

}
