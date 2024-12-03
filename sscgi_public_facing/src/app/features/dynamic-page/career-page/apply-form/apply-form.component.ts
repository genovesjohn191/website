import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { SscgiService } from '../../../../sscgi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-apply-form',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './apply-form.component.html',
  styleUrls: ['./apply-form.component.css'],
})
export class ApplyFormComponent implements OnInit {
  personalInfoData: any = [];
  workExpInfoData: any = [];
  educationInfoData: any = []
  additionalInfoData: any = [];
  referenceInfoData: any = [];
  additionalInfoForm: FormGroup;
  fileName = '';
  jobTitle: any;
  loading: boolean = false;
  private _formBuilder = inject(FormBuilder);
  applicationQuestions = [
    { question: 'Do you have physical defects or disabilities?', answer: '', specify: '' },
    { question: 'Have you ever been convicted of a crime?', answer: '', specify: '' },
    { question: 'Are you physically able and willing to travel?', answer: '', specify: '' },
    { question: 'Have you ever suffered from any serious nervous disorders or contagious diseases?', answer: '', specify: '' },
    { question: 'Have you ever been discharge or forced to resign from any position?', answer: '', specify: '' },
    
  ];
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    currentAddress: ['', Validators.required],
    permanentAddress: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  // Work Experience FormGroup with FormArray
  experienceEducationForm: FormGroup = this._formBuilder.group({
    experiences: this._formBuilder.array([]),
    education: this._formBuilder.array([]),
    characterReferences: this._formBuilder.array([])

  });



  // Education FormGroup with FormArray

  characterReferencesForm = this._formBuilder.group({
    characterReferences: this._formBuilder.array([this.createReference()]),
  });

  constructor(private service: SscgiService, private snackBar:MatSnackBar) {
    this.additionalInfoForm = this._formBuilder.group({
      questions: this._formBuilder.array([])
    });
  }
  ngOnInit(): void {
    this.loadQuestions(this.applicationQuestions);
    this.jobTitle = localStorage.getItem("jobTitle")

  }


  loadQuestions(questionsData: any[]): void {
    const questionsArray = this.additionalInfoForm.get('questions') as FormArray;
    questionsData.forEach(question => {
      questionsArray.push(this._formBuilder.group({
        question: [question.question],
        answer: [''],    // Default answer is empty
        specify: ['']    // Default specify is empty
      }));
    });
  }
  get questions(): FormArray {
    return this.additionalInfoForm.get('questions') as FormArray;
  }

  get experiences() {
    return this.experienceEducationForm.get('experiences') as FormArray;
  }

  get education() {
    return this.experienceEducationForm.get('education') as FormArray;
  }
  get characterReferences() {
    return (this.experienceEducationForm.get('characterReferences') as FormArray);
  }

  createReference(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  createExperienceGroup(): FormGroup {
    return this._formBuilder.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      currentlyWorking: [false],
      fromDate: ['', Validators.required],
      toDate: [null],
      resume: [null],
    });
  }

  createEducationGroup(): FormGroup {
    return this._formBuilder.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      location: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  addExperience() {
    this.experiences.push(this.createExperienceGroup());
  }

  isWorkExperienceValid(): boolean {
    return this.experiences.length > 0 && this.experiences.valid;
  }

  addEducation() {
    this.education.push(this.createEducationGroup());
  }


  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }
  onFileChange(event: Event) {
    const fileInput = (event.target as HTMLInputElement);
    const file = fileInput?.files ? fileInput.files[0] : null;
    console.log(file)

    if (file) {
      // Set the file for all experiences (if applicable)
      this.experiences.controls.forEach(exp => {
        exp.get('resume')?.setValue(file);  // Update the resume field for each experience
      });
    }
  }

  addReference() {
    this.characterReferences.push(this.createReference());
  }

  removeReference(index: number) {
    this.characterReferences.removeAt(index);
  }

  submitApplication() {
    // Handle form submission logic
    console.log('Application Submitted');
  }

  personalInfo() {
    if (this.firstFormGroup.valid) {
      this.personalInfoData = this.firstFormGroup.value
      console.log(this.personalInfoData);
    } else {
      this.firstFormGroup.markAllAsTouched();
    }
  }

  workExpInfo() {
    this.workExpInfoData = this.experiences.value;
    console.log(this.workExpInfoData);
  }

  educationInfo() {
    this.educationInfoData = this.education.value;
    console.log(this.educationInfoData);
  }

  additionalInfo() {
    this.additionalInfoData = this.additionalInfoForm.value.questions;
    console.log(this.additionalInfoData);
  }

  referenceInfo(){
    this.referenceInfoData = this.characterReferences.value;
    console.log(this.referenceInfoData);
  }
  goToStep(stepper: any, stepIndex: number) {
    stepper.selectedIndex = stepIndex;
  }

  onSubmit(form: any) {
  const myInformation = this.firstFormGroup.value;
  const experience = this.experienceEducationForm.get('experiences').value;
  const education = this.experienceEducationForm.get('education').value;
  const characterReference = this.experienceEducationForm.get('characterReferences').value;
  const additionalInfo = this.additionalInfoForm.get('questions').value;

  const completeData = {
    myInformation,
    experience,
    education,
    additionalInfo,
    characterReference
  };
  form = completeData
  console.log(form)

  this.service.apply(form).subscribe(data=>{
    console.log(data)
  })
    
  this.service.apply(form).subscribe({
    next: (data) => {
      console.log(data)
      if (data && data.message) {
        this.showSnackBar(data.message);
        this.loading = false;
      } else if (data == null) {
        this.showSnackBar(data.details);
      }
    },
    error: (error) => {
      this.showSnackBar(error.details)
      this.loading = false;
    },
    complete: () => {
      this.loading = false;
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

}
