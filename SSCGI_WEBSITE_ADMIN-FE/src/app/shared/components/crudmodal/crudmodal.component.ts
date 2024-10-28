
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormConfig } from '../../interfaces/form-model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@Component({
  selector: 'app-crudmodal',
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
    NgxMatSelectSearchModule,

  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './crudmodal.component.html',
  styleUrl: './crudmodal.component.css'
})
export class CRUDmodalComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  dynamicForm!: FormGroup;
  selectAll: string = 'Select All';
  formConfig: FormConfig;
  module: string = '';
  icon: string = '';
  mode: string = '';
  searchControl = new FormControl('');
  filteredOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CRUDmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formConfig = data.form;

    this.mode = data.mode;
    const mod = data.module.split('-');
    this.module = mod[0];
    if (this.mode === 'view') {
      this.icon = 'assets/Images/View.png'
    } else if (this.mode === 'edit') {
      this.icon = 'assets/Images/Edit Property.png'
    } else if (this.mode === 'create') {
      this.icon = 'assets/Images/Create.png'
    } else if (this.mode === 'delete') {
      this.icon = 'assets/Images/Trash.png'
    }
  }

  private emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (!email) return null; // Return null if there's no email
      return email.endsWith(domain) ? null : { invalidDomain: { value: control.value } };
    };
  }


  ngOnInit(): void {
    this.initializeFilteredOptions();
    const details = this.data?.details || {};
    // console.log(details);
  
    if (this.mode !== 'delete') {
      this.dynamicForm = this.fb.group(this.buildFormControls(details));
  
      if (this.formConfig.policies) {
        this.setupPolicies(details);
      }
  
      // console.log(this.dynamicForm.value);
    }
  }
  
  private buildFormControls(details: any): { [key: string]: FormControl } {
    return this.formConfig.fields.reduce((controls, field) => {
      controls[field.key] = new FormControl(
        { value: details[field.key] || '', disabled: this.mode === 'view' },
        this.getValidators(field) // Ensure that this returns a proper validator
      );
      return controls;
    }, {} as { [key: string]: FormControl });
  }
  
  private getValidators(field: any): ValidatorFn[] | null {
    const validators: ValidatorFn[] = [];
  
    if (field.required) {
      validators.push(Validators.required);
    }
  
    if (field.type === 'email') {
      validators.push(this.emailDomainValidator('@sscgi.com'));
    }
  
    return validators.length > 0 ? validators : null; // Return validators if any exist
  }
  
  private setupPolicies(details: any): void {
    this.dynamicForm.addControl('Policies', this.fb.array(
      this.formConfig.policies.map(policy => this.createPolicyGroup(policy))
    ));
  
    const rolePoliciesArray = this.dynamicForm.get('Policies') as FormArray;
    rolePoliciesArray.controls.forEach((policyControl: AbstractControl, index: number) => {
      const policyGroup = policyControl as FormGroup;
      const existingPolicy = (details.policies || [])[index];
      const options = policyGroup.get('options') as FormArray;
  
      if (existingPolicy) {
        this.patchPolicyValues(policyGroup, existingPolicy, options);
      }
    });
  
    if (this.mode === 'view') {
      rolePoliciesArray.disable();
    }
  }
  
  private patchPolicyValues(policyGroup: FormGroup, existingPolicy: any, options: FormArray): void {
    policyGroup.patchValue({
      isChecked: existingPolicy.isChecked,
      options: Array.isArray(existingPolicy.options) ? existingPolicy.options : []
    });
  
    const optionExist = Object.values(existingPolicy.options);
    options.controls.forEach((control, i) => {
      control.setValue(optionExist[i]);
    });
  }
  


  initializeFilteredOptions() {
    this.formConfig.fields.forEach(field => {
      if (field.type === 'select') {
        // Initialize a separate filteredOptions for each select field
        field.filteredOptions = field.selectOptions || [];
      }
    });

    // Subscribe to changes in searchControl to filter options
    this.searchControl.valueChanges.subscribe(value => {
      this.formConfig.fields.forEach(field => {
        if (field.type === 'select') {
          field.filteredOptions = this.filterOptions(value, field.selectOptions || []);
          // console.log(field.filteredOptions)
        }
      });
    });
  }


  filterOptions(searchTerm: string | null, options: any[]) {
    if (!searchTerm) {
      return this.sortOptions(options); // Sort the options alphabetically if there's no search term
    }
    searchTerm = searchTerm.toLowerCase();
    return this.sortOptions(
      options.filter(option => option.label.toLowerCase().includes(searchTerm))
    );
  }

  sortOptions(options: any[]) {
    return options.sort((a, b) => a.label.localeCompare(b.label));
  }


  createPolicyGroup(policy: { rolePolicyName: string, options: string[] }): FormGroup {
    return this.fb.group({
      name: policy.rolePolicyName,
      isChecked: new FormControl(false),
      options: this.fb.array(policy.options.map(() => new FormControl(false)))
    });
  }

  get rolePoliciesArray() {
    return this.dynamicForm.get('Policies') as FormArray;

  }

  getOptionsArray(policyIndex: number) {
    return this.rolePoliciesArray.at(policyIndex).get('options') as FormArray;
  }

  rolePoliciesValidator(formGroup: FormGroup): { [key: string]: any } | null {
    if (!this.formConfig.policies) return null;

    const rolePoliciesArray = formGroup.get('Policies') as FormArray;
    for (let i = 0; i < rolePoliciesArray.length; i++) {
      const policyGroup = rolePoliciesArray.at(i) as FormGroup;
      const isChecked = policyGroup.get('isChecked')?.value;
      const optionsArray = policyGroup.get('options') as FormArray;
      const anyOptionSelected = optionsArray.controls.some(control => control.value);

      if (isChecked && !anyOptionSelected) {
        return { rolePolicyRequired: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      return;
    }
  
    const formValue = this.dynamicForm.value;
    const transformedRolePolicies = this.formConfig.policies ? formValue.Policies.map((policy: any, index: number) => {
      const existingPolicy = this.data.details?.policies?.[index] || {};
      return {
        rolePolicyName: policy.name,
        isChecked: policy.isChecked,
        ... (existingPolicy.rolePolicyId ? { rolePolicyId: existingPolicy.rolePolicyId } : {}),
        options: policy.isChecked ? [{
          CanCreate: policy.options[0],
          CanDelete: policy.options[1],
          CanEdit: policy.options[2],
          CanRestore: policy.options[3],
          CanView: policy.options[4],
          ...(existingPolicy.rolePolicyId ? { rolePolicyControlId: existingPolicy.rolePolicyId } : {})
        }] : [{
          CanCreate: false,
          CanDelete: false,
          CanEdit: false,
          CanRestore: false,
          CanView: false,
          ...(existingPolicy.rolePolicyId ? { rolePolicyControlId: existingPolicy.rolePolicyId } : {})
        }]
      };
    }) : [];
    
    const roleId = this.data.details?.roleId || null;
    const userId = this.data.details?.userId || null;
    const transformedFormValue = {
      ...formValue,
      Policies: transformedRolePolicies,
      ...(roleId ? { roleId } : {}),
      ...(userId ? { userId } : {})
    };
    // console.log(transformedFormValue)
  
    this.formSubmitted.emit({ ...transformedFormValue });
    this.dialogRef.close({ ...transformedFormValue });
  }
  
  onDelete() {
    let transformedFormValue: any;
    // console.log(this.module)
    if (this.module === "role") {
      const roleId = this.data.details?.roleId;
      transformedFormValue = {
        roleId: roleId
      };
    } else if (this.module === "employee") { // Changed to "person" to check for a different module
      const personId = this.data.details?.personId;
      transformedFormValue = {
        personId: personId
      };
    } else if(this.module === "User Account"){
      const userId = this.data.details?.userId;
      transformedFormValue = {
        userId: userId
      };
    } else if(this.module === "email template"){
      const emailTemplateId = this.data.details?.emailTemplateId;
      transformedFormValue = {
        emailTemplateId: emailTemplateId
      };
      console.log("transformedFormValue",transformedFormValue);
    }
    else {
      // Handle other modules or throw an error if necessary
      console.error('Unknown module type:', this.module);
      return; // Exit the method if the module is unknown
    } 
  
    this.formSubmitted.emit({ ...transformedFormValue });
    this.dialogRef.close({ ...transformedFormValue });
  }
  

  onRestore(){
    let transformedFormValue: any;
  
    if (this.module === "role") {
      const roleId = this.data.details?.roleId;
      transformedFormValue = {
        roleId: roleId
      };
    } else if (this.module === "employee") { // Changed to "person" to check for a different module
      const personId = this.data.details?.personId;
      transformedFormValue = {
        personId: personId
      };
    } else if(this.module === "User Account"){
      const userId = this.data.details?.userId;
      transformedFormValue = {
        userId: userId
      };
    } else if(this.module === "email template"){
      const emailTemplateId = this.data.details?.emailTemplateId;
      transformedFormValue = {
        emailTemplateId: emailTemplateId
      };
      console.log("transformedFormValue",transformedFormValue);
    }else {
      // Handle other modules or throw an error if necessary
      console.error('Unknown module type:', this.module);
      return; // Exit the method if the module is unknown
    }
  
    this.formSubmitted.emit({ ...transformedFormValue });
    this.dialogRef.close({...transformedFormValue });
  }

  toggleOptions(policyIndex: number) {
    const policy = this.rolePoliciesArray.at(policyIndex);
    const isChecked = policy.get('isChecked')?.value;
    const options = this.getOptionsArray(policyIndex);
    options.controls.forEach(control => {
      if (isChecked) {
        control.enable();
      } else {
        control.disable();
      }
    });
  }

  toggleSelectAll() {
    if (!this.formConfig.policies) return;

    const allChecked = this.rolePoliciesArray.controls.every(policyGroup => {
      const options = policyGroup.get('options') as FormArray;
      return policyGroup.get('isChecked')?.value && options.controls.every(control => control.value);
    });

    this.selectAll = allChecked ? 'Select All' : 'Unselect All';
    this.rolePoliciesArray.controls.forEach(policyGroup => {
      (policyGroup as FormGroup).get('isChecked')?.setValue(!allChecked);
      const options = (policyGroup as FormGroup).get('options') as FormArray;
      options.controls.forEach(control => control.setValue(!allChecked));
    });
  }

  updateSelectAllText() {
    const allChecked = this.rolePoliciesArray.controls.every(policyGroup => {
      const options = (policyGroup as FormGroup).get('options') as FormArray;
      return (policyGroup as FormGroup).get('isChecked')?.value && options.controls.every(control => control.value);
    });

    this.selectAll = allChecked ? 'Unselect All' : 'Select All';
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
