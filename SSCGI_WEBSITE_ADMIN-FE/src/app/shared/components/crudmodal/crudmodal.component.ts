
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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

  ngOnInit(): void {
    this.initializeFilteredOptions();
    const details = this.data?.details || {};

    if (this.mode !== 'delete') {
      this.dynamicForm = this.fb.group(
        this.formConfig.fields.reduce((controls, field) => {
          controls[field.key] = new FormControl(
            { value: details[field.key] || '', disabled: this.mode === 'view' },
            field.required ? Validators.required : null
          );
          return controls;
        }, {} as { [key: string]: any })
      );

      if (this.formConfig.policies) {
        this.dynamicForm.addControl('Policies', this.fb.array(
          this.formConfig.policies.map(policy => this.createPolicyGroup(policy))
        ));

        const rolePoliciesArray = this.dynamicForm.get('Policies') as FormArray;
        console.log(rolePoliciesArray, 're')
        rolePoliciesArray.controls.forEach((policyControl: AbstractControl, index: number) => {
          const policyGroup = policyControl as FormGroup;
          const existingPolicy = (details.policies || [])[index];
          const options = policyGroup.get('options') as FormArray;

          if (existingPolicy) {
            policyGroup.patchValue({
              isChecked: existingPolicy.isChecked,
              options: Array.isArray(existingPolicy.options) ? existingPolicy.options : []
            });

            const optionExist = Object.values(existingPolicy.options);
            options.controls.forEach((control, i) => {
              control.setValue(optionExist[i]);
            });
          }
        });

        if (this.mode === 'view') {
          console.log(rolePoliciesArray)
          rolePoliciesArray.disable();
        }
      }
    }
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
        console.log('Invalid');
        return;
      }

      const formValue = this.dynamicForm.value;
      const transformedRolePolicies = this.formConfig.policies ? formValue.Policies
        .filter((policy: any) => policy.isChecked) // Only include checked policies
        .map((policy: any, index: number) => ({
          rolePolicyName: policy.name,
          isChecked: policy.isChecked,
          options: [this.formConfig.policies![index].options.reduce((acc: any, option: string, i: number) => {
            acc[option] = policy.options[i];
            return acc;
          }, {})
        ]
        })) : [];

      const transformedFormValue = {
        ...formValue,
        Policies: transformedRolePolicies
      };

      this.formSubmitted.emit({ mode: this.mode, ...transformedFormValue });
      this.dialogRef.close({ mode: this.mode, ...transformedFormValue });
      this.dialogRef.close(transformedFormValue);

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
