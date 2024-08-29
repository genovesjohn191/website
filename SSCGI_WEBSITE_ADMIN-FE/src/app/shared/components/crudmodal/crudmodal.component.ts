<<<<<<< HEAD
import { Component, Inject, OnInit } from '@angular/core';
=======

import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
>>>>>>> master
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormConfig } from '../../interfaces/form-model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
<<<<<<< HEAD
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
=======
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

>>>>>>> master

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
<<<<<<< HEAD
  ],
=======
    NgxMatSelectSearchModule,

  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
>>>>>>> master
  templateUrl: './crudmodal.component.html',
  styleUrl: './crudmodal.component.css'
})
export class CRUDmodalComponent implements OnInit {
<<<<<<< HEAD
=======
  @Output() formSubmitted = new EventEmitter<any>();
>>>>>>> master
  dynamicForm!: FormGroup;
  selectAll: string = 'Select All';
  formConfig: FormConfig;
  module: string = '';
  icon: string = '';
  mode: string = '';
<<<<<<< HEAD
=======
  searchControl = new FormControl('');
  filteredOptions: any[] = [];
>>>>>>> master

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CRUDmodalComponent>,
<<<<<<< HEAD
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formConfig = data.form;
    this.mode = data.mode;
    const mod = data.module.split('-');
    this.module = mod[0];
    if(this.mode === 'view'){
      this.icon = 'assets/Images/View.png'
    }else if(this.mode === 'edit'){
      this.icon = 'assets/Images/Edit Property.png'
    }else if (this.mode === 'create'){
      this.icon = 'assets/Images/Create.png'
    }else if(this.mode === 'delete'){
=======
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
>>>>>>> master
      this.icon = 'assets/Images/Trash.png'
    }
  }

  ngOnInit(): void {
<<<<<<< HEAD
    const details = this.data?.details || {};

    if(this.mode !== 'delete')
    {
=======
    this.initializeFilteredOptions();
    const details = this.data?.details || {};

    if (this.mode !== 'delete') {
>>>>>>> master
      this.dynamicForm = this.fb.group(
        this.formConfig.fields.reduce((controls, field) => {
          controls[field.key] = new FormControl(
            { value: details[field.key] || '', disabled: this.mode === 'view' },
            field.required ? Validators.required : null
          );
          return controls;
        }, {} as { [key: string]: any })
      );
<<<<<<< HEAD
  
      if (this.formConfig.policies) {
        this.dynamicForm.addControl('rolePolicies', this.fb.array(
          this.formConfig.policies.map(policy => this.createPolicyGroup(policy))
        ));
  
        const rolePoliciesArray = this.dynamicForm.get('rolePolicies') as FormArray;
=======

      if (this.formConfig.policies) {
        this.dynamicForm.addControl('Policies', this.fb.array(
          this.formConfig.policies.map(policy => this.createPolicyGroup(policy))
        ));

        const rolePoliciesArray = this.dynamicForm.get('Policies') as FormArray;
        console.log(rolePoliciesArray, 're')
>>>>>>> master
        rolePoliciesArray.controls.forEach((policyControl: AbstractControl, index: number) => {
          const policyGroup = policyControl as FormGroup;
          const existingPolicy = (details.policies || [])[index];
          const options = policyGroup.get('options') as FormArray;
<<<<<<< HEAD
  
          if (existingPolicy) {
            policyGroup.patchValue({
              checked: existingPolicy.checked,
              options: Array.isArray(existingPolicy.options) ? existingPolicy.options : []
            });
  
=======

          if (existingPolicy) {
            policyGroup.patchValue({
              isChecked: existingPolicy.isChecked,
              options: Array.isArray(existingPolicy.options) ? existingPolicy.options : []
            });

>>>>>>> master
            const optionExist = Object.values(existingPolicy.options);
            options.controls.forEach((control, i) => {
              control.setValue(optionExist[i]);
            });
          }
        });
<<<<<<< HEAD
  
        if (this.mode === 'view') {
=======

        if (this.mode === 'view') {
          console.log(rolePoliciesArray)
>>>>>>> master
          rolePoliciesArray.disable();
        }
      }
    }
  }

<<<<<<< HEAD
  createPolicyGroup(policy: { name: string, options: string[] }): FormGroup {
    return this.fb.group({
      name: policy.name,
      checked: new FormControl(false),
=======

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
>>>>>>> master
      options: this.fb.array(policy.options.map(() => new FormControl(false)))
    });
  }

  get rolePoliciesArray() {
<<<<<<< HEAD
    return this.dynamicForm.get('rolePolicies') as FormArray;
=======
    return this.dynamicForm.get('Policies') as FormArray;

>>>>>>> master
  }

  getOptionsArray(policyIndex: number) {
    return this.rolePoliciesArray.at(policyIndex).get('options') as FormArray;
  }

  rolePoliciesValidator(formGroup: FormGroup): { [key: string]: any } | null {
    if (!this.formConfig.policies) return null;

<<<<<<< HEAD
    const rolePoliciesArray = formGroup.get('rolePolicies') as FormArray;
    for (let i = 0; i < rolePoliciesArray.length; i++) {
      const policyGroup = rolePoliciesArray.at(i) as FormGroup;
      const checked = policyGroup.get('checked')?.value;
      const optionsArray = policyGroup.get('options') as FormArray;
      const anyOptionSelected = optionsArray.controls.some(control => control.value);

      if (checked && !anyOptionSelected) {
=======
    const rolePoliciesArray = formGroup.get('Policies') as FormArray;
    for (let i = 0; i < rolePoliciesArray.length; i++) {
      const policyGroup = rolePoliciesArray.at(i) as FormGroup;
      const isChecked = policyGroup.get('isChecked')?.value;
      const optionsArray = policyGroup.get('options') as FormArray;
      const anyOptionSelected = optionsArray.controls.some(control => control.value);

      if (isChecked && !anyOptionSelected) {
>>>>>>> master
        return { rolePolicyRequired: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      console.log('Invalid');
      return;
    }

    const formValue = this.dynamicForm.value;
<<<<<<< HEAD
    const transformedRolePolicies = this.formConfig.policies ? formValue.rolePolicies.map((policy: any, index: number) => ({
      name: policy.name,
      checked: policy.checked,
      options: this.formConfig.policies![index].options.reduce((acc: any, option: string, i: number) => {
        acc[option] = policy.options[i];
        return acc;
      }, {})
    })) : [];

    const transformedFormValue = {
      ...formValue,
      rolePolicies: transformedRolePolicies
    };

    console.log(transformedFormValue);
    this.dialogRef.close();
=======
    const transformedRolePolicies = this.formConfig.policies ? formValue.Policies
      .filter((policy: any) => policy.isChecked) // Only include checked policies
      .map((policy: any, index: number) => ({
        rolePolicyName: policy.name,
        isChecked: policy.isChecked,
        options: this.formConfig.policies![index].options.reduce((acc: any, option: string, i: number) => {
          acc[option] = policy.options[i];
          return acc;
        }, {})
      })) : [];

    const transformedFormValue = {
      ...formValue,
      Policies: transformedRolePolicies
    };

    this.formSubmitted.emit(transformedFormValue);

    this.dialogRef.close(transformedFormValue);

>>>>>>> master
  }

  toggleOptions(policyIndex: number) {
    const policy = this.rolePoliciesArray.at(policyIndex);
<<<<<<< HEAD
    const checked = policy.get('checked')?.value;
    const options = this.getOptionsArray(policyIndex);
    options.controls.forEach(control => {
      if (checked) {
=======
    const isChecked = policy.get('isChecked')?.value;
    const options = this.getOptionsArray(policyIndex);
    options.controls.forEach(control => {
      if (isChecked) {
>>>>>>> master
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
<<<<<<< HEAD
      return policyGroup.get('checked')?.value && options.controls.every(control => control.value);
=======
      return policyGroup.get('isChecked')?.value && options.controls.every(control => control.value);
>>>>>>> master
    });

    this.selectAll = allChecked ? 'Select All' : 'Unselect All';
    this.rolePoliciesArray.controls.forEach(policyGroup => {
<<<<<<< HEAD
      (policyGroup as FormGroup).get('checked')?.setValue(!allChecked);
=======
      (policyGroup as FormGroup).get('isChecked')?.setValue(!allChecked);
>>>>>>> master
      const options = (policyGroup as FormGroup).get('options') as FormArray;
      options.controls.forEach(control => control.setValue(!allChecked));
    });
  }

  updateSelectAllText() {
    const allChecked = this.rolePoliciesArray.controls.every(policyGroup => {
      const options = (policyGroup as FormGroup).get('options') as FormArray;
<<<<<<< HEAD
      return (policyGroup as FormGroup).get('checked')?.value && options.controls.every(control => control.value);
=======
      return (policyGroup as FormGroup).get('isChecked')?.value && options.controls.every(control => control.value);
>>>>>>> master
    });

    this.selectAll = allChecked ? 'Unselect All' : 'Select All';
  }
<<<<<<< HEAD
=======

  onCancel(): void {
    this.dialogRef.close();
  }
>>>>>>> master
}
