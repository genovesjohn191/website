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
import { divStyles, sectionStyles, fontStyles, fontWeights, fontFamilies, fontSizes, textAlignments } from '../styles';

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

  divStyles = divStyles;
  sectionStyles = sectionStyles;
  fontStyles = fontStyles;
  fontWeights = fontWeights;
  fontFamilies = fontFamilies;
  fontSizes = fontSizes;
  textAlignments = textAlignments;

  backgroundImageName = '';
  backgroundImageFile: string | ArrayBuffer | null = null;

  sequenceOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  sectionForm!: FormGroup;
  elementRelations: { [key: string]: string[] } = {};
  elementIdCounter = 1; // Counter to keep track of element IDs

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sectionForm = this.fb.group({
      sectionName: ['', Validators.required],
      page: ['', Validators.required],
      sequence: ['', Validators.required],
      description: ['', Validators.required],
      backgroundColor: [''],
      backgroundImage: [''],
      sectionLayout: [''],
      elements: this.fb.array([]),
      height:'auto',
      padding: '16px',
      gap:'16px'
    });
  }

  get elements() {
    return this.sectionForm.get('elements') as FormArray;
  }

  addElement(parentId?: number): void {
    const elementId = this.elementIdCounter++;
    const elementGroup = this.fb.group({
      id: [elementId],
      elementType: ['', Validators.required],
      elementText: [''],
      parentId: [parentId || null],
      isParent: false,
      divLayout: '',
      divBackground:'',
      fontStyle: ['normal'],
      fontColor: ['#000000'],
      fontWeight: ['normal'],
      fontFamily: ['Arial'],
      fontSize: ['16px'],
      textAlignment: ['left'],
      children: this.fb.array([]) // Add a FormArray for child elements
    });
  
    // Add element to the form array
    this.elements.push(elementGroup);
  
    // If parentId is provided, add this element as a child of the specified parent
    if (parentId) {
      const parent = this.findElementGroupById(parentId);
      if (parent) {
        const childrenArray = parent.get('children') as FormArray;
        childrenArray.push(elementGroup);
      }
    }
  }
  
  removeElement(index: number): void {
    const elementGroup = this.elements.at(index);
    const elementId = elementGroup.get('id')?.value;
  
    // Remove element from parent's children list
    const parentId = elementGroup.get('parentId')?.value;
    if (parentId) {
      const parent = this.findElementGroupById(parentId);
      if (parent) {
        const childrenArray = parent.get('children') as FormArray;
        const childIndex = childrenArray.controls.findIndex(child => child.get('id')?.value === elementId);
        if (childIndex > -1) {
          childrenArray.removeAt(childIndex);
        }
      }
    }
  
    // Remove element itself
    this.elements.removeAt(index);
  }
  
  private findElementGroupById(id: number): FormGroup | null {
    for (let i = 0; i < this.elements.length; i++) {
      const group = this.elements.at(i) as FormGroup;
      if (group.get('id')?.value === id) {
        return group;
      }
      const children = group.get('children') as FormArray;
      for (let j = 0; j < children.length; j++) {
        const childGroup = children.at(j) as FormGroup;
        if (childGroup.get('id')?.value === id) {
          return childGroup;
        }
      }
    }
    return null;
  }
  

  get backgroundStyle(): string {
    const backgroundColor = this.sectionForm.get('backgroundColor')?.value;
    if (this.backgroundImageFile) {
      return `url(${this.backgroundImageFile})`;
    }
    return backgroundColor || '';
  }

  get sectionStyle(): string {
    return this.sectionForm.get('sectionLayout')?.value || '';
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
        this.sectionForm.patchValue({ backgroundImage: this.backgroundImageFile });
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

  onElementTypeChange(index: number): void {
    const elementType = this.elements.at(index).get('elementType')?.value;
    const elementId = this.elements.at(index).get('id')?.value;
    if (elementType === 'div') {
      this.elements.at(index).get('isParent')?.setValue(true);
    } else {
      this.elements.at(index).get('isParent')?.setValue(false);
      delete this.elementRelations[elementId];
    }
  }

  toggle(type: string) {
    if (type === 'selectPage') {
      this.selectPage = !this.selectPage;
    } else if (type === 'preview') {
      this.preview = !this.preview;
    } else if (type === 'element') {
      this.element = !this.element;
    } else if (type === 'sectionLayout') {
      this.sectionLayout = !this.sectionLayout;
    }
  }
}
