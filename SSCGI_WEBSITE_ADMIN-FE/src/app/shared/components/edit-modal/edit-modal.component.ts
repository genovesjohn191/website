import { Component, Inject } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-modal',
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
  ],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'] // Fixed typo here from styleUrl to styleUrls
})
export class EditModalComponent {
  dynamicForm!: FormGroup;
  selectAll: string = 'Select All';
  formConfig: FormConfig;
  module: string = '';
  icon: string = 'assets/Images/Edit Property.png';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formConfig = data.form;
    const mod = data.module.split('-')
    this.module = mod[0]
  }

  ngOnInit(): void {
    // Initialize form controls
    this.dynamicForm = this.fb.group(
      this.formConfig.fields.reduce((controls, field) => {
        controls[field.key] = [
          this.data.details[field.key] || '', // Initialize with existing value
          field.required ? Validators.required : null
        ];
        return controls;
      }, {} as { [key: string]: any })
    );
  
    // Initialize role policies if present
    if (this.formConfig.policies) {
      this.dynamicForm.addControl('rolePolicies', this.fb.array(
        this.formConfig.policies.map(policy => this.createPolicyGroup(policy))
      ));
  
      // Populate the rolePolicies array with existing data
      const rolePoliciesArray = this.dynamicForm.get('rolePolicies') as FormArray;
      rolePoliciesArray.controls.forEach((policyControl: AbstractControl, index: number) => {
        const policyGroup = policyControl as FormGroup; // Cast to FormGroup
        const existingPolicy = (this.data.details.policies || [])[index];
        const options = (policyGroup as FormGroup).get('options') as FormArray;
        // console.log(options.value)
        if (existingPolicy) {
          policyGroup.patchValue({
            checked: existingPolicy.checked,
            options: Array.isArray(existingPolicy.options) ? existingPolicy.options : []
          });
          const optionExist = Object.values(existingPolicy.options)

          options.controls.forEach((control, i=index) => {
            control.setValue(optionExist[i])
          });
          // console.log(options.value)
        }
        
      });
    }
  }
  

  createPolicyGroup(policy: { name: string, options: string[] }): FormGroup {
    return this.fb.group({
      name: policy.name,
      checked: new FormControl(false),
      options: this.fb.array(policy.options.map(() => new FormControl(false)))
    });
  }

  get rolePoliciesArray() {
    return this.dynamicForm.get('rolePolicies') as FormArray;
  }

  getOptionsArray(policyIndex: number) {
    return this.rolePoliciesArray.at(policyIndex).get('options') as FormArray;
  }

  rolePoliciesValidator(formGroup: FormGroup): { [key: string]: any } | null {
    if (!this.formConfig.policies) return null;

    const rolePoliciesArray = formGroup.get('rolePolicies') as FormArray;
    for (let i = 0; i < rolePoliciesArray.length; i++) {
      const policyGroup = rolePoliciesArray.at(i) as FormGroup;
      const checked = policyGroup.get('checked')?.value;
      const optionsArray = policyGroup.get('options') as FormArray;
      const anyOptionSelected = optionsArray.controls.some(control => control.value);

      if (checked && !anyOptionSelected) {
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
  }

  toggleOptions(policyIndex: number) {
    const policy = this.rolePoliciesArray.at(policyIndex);
    const checked = policy.get('checked')?.value;
    const options = this.getOptionsArray(policyIndex);
    options.controls.forEach(control => {
      if (checked) {
        control.enable();
      } else {
        control.disable();
      }
    });
  }

  toggleSelectAll() {
    if (!this.formConfig.policies) return;

    const allChecked = this.rolePoliciesArray.controls.every((policyGroup) => {
        const options = policyGroup.get('options') as FormArray;
        return policyGroup.get('checked')?.value && options.controls.every((control) => control.value);
    });

    this.selectAll = allChecked ? 'Select All' : 'Unselect All';
    this.rolePoliciesArray.controls.forEach((policyGroup) => {
      (policyGroup as FormGroup).get('checked')?.setValue(!allChecked);
      const options = (policyGroup as FormGroup).get('options') as FormArray;
      options.controls.forEach((control) => control.setValue(!allChecked));
    });
  }

  updateSelectAllText() {
    const allChecked = this.rolePoliciesArray.controls.every((policyGroup) => {
      const options = (policyGroup as FormGroup).get('options') as FormArray;
      return (policyGroup as FormGroup).get('checked')?.value && options.controls.every((control) => control.value);
    });

    this.selectAll = allChecked ? 'Unselect All' : 'Select All';
  }
}
