import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  roleForm!: FormGroup;
  selectAll: string = 'Select All';
  rolePolicies = [
    { name: 'Role', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
    { name: 'Employee', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
    { name: 'User Account', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
    { name: 'Section Formatting', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
    { name: 'Email Template', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
    { name: 'Career Vacancies', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
    { name: 'Applicants', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] }
  ];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateModalComponent>) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      roleCode: ['', Validators.required],
      roleName: ['', Validators.required],
      description: [''],
      rolePolicies: this.fb.array(this.rolePolicies.map(policy => this.createPolicyGroup(policy)))
    }, { validators: this.rolePoliciesValidator });
  }

  createPolicyGroup(policy: { name: string, options: string[] }): FormGroup {
    return this.fb.group({
      name: policy.name,
      enabled: new FormControl(false),
      options: this.fb.array(policy.options.map(() => new FormControl(false)))
    });
  }

  get rolePoliciesArray() {
    return this.roleForm.get('rolePolicies') as FormArray;
  }

  getOptionsArray(policyIndex: number) {
    return this.rolePoliciesArray.at(policyIndex).get('options') as FormArray;
  }

  rolePoliciesValidator(formGroup: FormGroup): { [key: string]: any } | null {
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
    if (this.roleForm.invalid) {
      // Optionally, you can highlight invalid fields here
      return;
    }

    const formValue = this.roleForm.value;
    const transformedRolePolicies = formValue.rolePolicies.map((policy: any, index: number) => ({
      name: policy.name,
      enabled: policy.enabled,
      options: this.rolePolicies[index].options.reduce((acc: any, option: string, i: number) => {
        acc[option] = policy.options[i];
        return acc;
      }, {})
    }));

    const transformedFormValue = {
      ...formValue,
      rolePolicies: transformedRolePolicies
    };

    console.log(transformedFormValue);
    
    // Close the modal
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
