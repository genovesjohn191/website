import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SectionPreviewComponent } from '../section-preview/section-preview.component';

@Component({
  selector: 'app-section-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    SectionPreviewComponent,
  ],
  templateUrl: './section-create.component.html',
  styleUrls: ['./section-create.component.css']
})
export class SectionCreateComponent implements OnInit {
  sectionForm!: FormGroup;

  field = {
    required: true,
    selectOptions: ['Option1', 'Option2', 'Option3']
  };

  sequenceOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sectionForm = this.fb.group({
      sectionName: ['', [Validators.required]],
      page: ['', [Validators.required]],
      sequence: ['', [Validators.required]],
      description: ['', [Validators.required]],
      background: [''] 
    });
  }

  get backgroundStyle(): string {
    console.log(this.sectionForm.get('background')?.value)
    return this.sectionForm.get('background')?.value;
  }
}
