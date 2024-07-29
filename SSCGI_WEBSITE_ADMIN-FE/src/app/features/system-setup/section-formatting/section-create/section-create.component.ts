import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectPage = true;
  preview = true;
  background = true;
  element = true;
  sectionLayout = true;

  pageOptions = ['Option1', 'Option2', 'Option3'];

  elementTypes = [
    { name: 'Container', value: 'div' },
    { name: 'Text', value: 'p' },
    { name: 'Title', value: 'h1' },
    { name: 'Button', value: 'button' }
  ];

  divStyles = [
    { name: 'Three Column', style: 'three-column-style' },
    { name: 'Two Column', style: 'two-column-style' },
    { name: 'One Column', style: 'one-column-style' },
    { name: 'One Column Left Half', style: 'one-column-left-half-style' },
    { name: 'One Column Right Half', style: 'one-column-right-half-style' }
  ];

  sectionStyles = [
    { name: 'One Column', style: 'one-column-style' },
    { name: 'Two Column', style: 'two-column-style' },
    { name: 'Three Column', style: 'three-column-style' }
  ];

  fontStyles = [
    { name: 'Normal', value: 'normal' },
    { name: 'Italic', value: 'italic' },
    { name: 'Oblique', value: 'oblique' }
  ];

  fontWeights = [
    { name: 'Normal', value: 'normal' },
    { name: 'Bold', value: 'bold' },
    { name: 'Bolder', value: 'bolder' },
    { name: 'Lighter', value: 'lighter' }
  ];

  fontFamilies = [
    'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'
  ];

  fontSizes = [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
  ];

  textAlignments = [
    { name: 'Left', value: 'left' },
    { name: 'Center', value: 'center' },
    { name: 'Right', value: 'right' }
  ];

  backgroundImageName = '';
  backgroundImageFile: string | ArrayBuffer | null = null;

  sequenceOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  sectionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sectionForm = this.fb.group({
      sectionName: ['', Validators.required],
      page: ['', Validators.required],
      sequence: ['', Validators.required],
      description: ['', Validators.required],
      backgroundColor: [''],
      sectionStyle: [''],
      elements: this.fb.array([])
    });
  }

  get elements() {
    return this.sectionForm.get('elements') as FormArray;
  }

  addElement(parentIndex?: number): void {
    const elementGroup = this.fb.group({
      elementType: ['', Validators.required],
      elementText: [''],
      isParent: [false],
      style: '',
      children: this.fb.array([]),
      fontStyle: ['normal'],
      fontColor: ['#000000'],
      fontWeight: ['normal'],
      fontFamily: ['Arial'],
      fontSize: ['16px'],
      textAlignment: ['left']
    });
    if (parentIndex !== undefined) {
      (this.elements.at(parentIndex).get('children') as FormArray).push(elementGroup);
    } else {
      this.elements.push(elementGroup);
    }
  }

  removeElement(index: number, childIndex?: number): void {
    if (childIndex !== undefined) {
      (this.elements.at(index).get('children') as FormArray).removeAt(childIndex);
    } else {
      this.elements.removeAt(index);
    }
  }

  get backgroundStyle(): string {
    const backgroundColor = this.sectionForm.get('backgroundColor')?.value;
    if (this.backgroundImageFile) {
      return `url(${this.backgroundImageFile})`;
    }
    return backgroundColor || '';
  }

  get sectionStyle(): string {
    return this.sectionForm.get('sectionStyle')?.value || '';
  }
  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const reader = new FileReader();
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.backgroundImageName = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.backgroundImageFile = reader.result;
      };
    }
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  removeImage(): void {
    this.backgroundImageFile = null;
    this.backgroundImageName = '';
    this.sectionForm.get('backgroundColor')?.setValue('');
  }

  getFormattedElements() {
    const formatElement = (elementGroup: FormGroup): any => {
      const childrenArray = elementGroup.get('children') as FormArray;
      return {
        type: elementGroup.get('elementType')?.value,
        text: elementGroup.get('elementText')?.value,
        isParent: elementGroup.get('isParent')?.value,
        style: elementGroup.get('style')?.value,
        fontStyle: elementGroup.get('fontStyle')?.value,
        fontColor: elementGroup.get('fontColor')?.value,
        fontWeight: elementGroup.get('fontWeight')?.value,
        fontFamily: elementGroup.get('fontFamily')?.value,
        fontSize: elementGroup.get('fontSize')?.value,
        textAlignment: elementGroup.get('textAlignment')?.value,
        children: childrenArray.controls.map(child => formatElement(child as FormGroup))
      };
    };

    return this.elements ? this.elements.controls.map(control => formatElement(control as FormGroup)) : [];
  }

  getChildren(index: number): FormArray {
    return this.elements.at(index).get('children') as FormArray;
  }

  onElementTypeChange(index: number): void {
    const elementType = this.elements.at(index).get('elementType')?.value;
    this.elements.at(index).get('isParent')?.setValue(elementType === 'div');
  }

  toggle(type:string){
    if(type ==='selectPage'){
      this.selectPage = !this.selectPage
      console.log(this.selectPage)
    }else if(type ==='preview'){
      this.preview = !this.preview
    }else if (type ==='background'){
      this.background = !this.background
    }else if (type === 'element'){
      this.element = !this.element
    }else if (type === 'layout'){
      this.sectionLayout = !this.sectionLayout
    }
  }
}
