import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormConfig } from '../../interfaces/form-model';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css'],
})
export class CreateModalComponent {
  dynamicForm!: FormGroup;
  selectAll: string = 'Select All';
  formConfig: FormConfig;
  module: string =''
  icon: string = ''
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormConfig & { module:string, icon:string}
  ) {
    this.formConfig = data;
    this.module = data.module
    this.icon = data.icon
  }

  ngOnInit(): void {
    console.log(this.formConfig)
    this.dynamicForm = this.fb.group(
      this.formConfig.fields.reduce((controls, field) => {
        controls[field.key] = [
          '',
          field.required ? Validators.required : null
        ];
        return controls;
      }, {} as { [key: string]: any })
    );

    if (this.formConfig.policies) {
      this.dynamicForm.addControl('rolePolicies', this.fb.array(
        this.formConfig.policies.map(policy => this.createPolicyGroup(policy))
      ));
    }
  }

  createPolicyGroup(policy: { name: string, options: string[] }): FormGroup {
    return this.fb.group({
      name: policy.name,
      enabled: new FormControl(false),
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
      const enabled = policyGroup.get('enabled')?.value;
      const optionsArray = policyGroup.get('options') as FormArray;
      const anyOptionSelected = optionsArray.controls.some(control => control.value);

      if (enabled && !anyOptionSelected) {
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
      enabled: policy.enabled,
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
    const enabled = policy.get('enabled')?.value;
    const options = this.getOptionsArray(policyIndex);
    options.controls.forEach(control => {
      if (enabled) {
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
      return policyGroup.get('enabled')?.value && options.controls.every((control) => control.value);
    });

    this.selectAll = allChecked ? 'Select All' : 'Unselect All';

    this.rolePoliciesArray.controls.forEach((policyGroup) => {
      policyGroup.get('enabled')?.setValue(!allChecked);
      const options = policyGroup.get('options') as FormArray;
      options.controls.forEach((control) => control.setValue(!allChecked));
    });
  }
}
