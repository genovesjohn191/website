import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { RoleData } from '../../../shared/interfaces/role-model';
import { FormConfig } from '../../../shared/interfaces/form-model';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  link = "usermanagement/role-management";
  module = 'role-management';
  icon = '/assets/Images/Hierarchy.png';

  myData: RoleData[] = [
    {
      roleCode: "Admin",
      roleName: "Administrator",
      description: "Full access to all system functionalities",
      policies: [
        { name: 'Role', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Employee', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'User Account', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Section Formatting', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Email Template', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Career Vacancies', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Applicants', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } }
      ]
    },
    {
      roleCode: "Editor",
      roleName: "Content Editor",
      description: "Can edit and manage content",
      policies: [
        { name: 'Role', checked: true, options: { Create: false, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'User Account', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: true, options: { Create: false, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Email Template', checked: true, options: { Create: false, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Applicants', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "Viewer",
      roleName: "Content Viewer",
      description: "Can view content but not modify it",
      policies: [
        { name: 'Role', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'User Account', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Email Template', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Applicants', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "Manager",
      roleName: "Project Manager",
      description: "Manages projects and teams",
      policies: [
        { name: 'Role', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'User Account', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Email Template', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Applicants', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "HR",
      roleName: "HR Specialist",
      description: "Handles human resources tasks",
      policies: [
        { name: 'Role', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'User Account', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Email Template', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Applicants', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "Dev",
      roleName: "Developer",
      description: "Develops and maintains software applications",
      policies: [
        { name: 'Role', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'User Account', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Email Template', checked: true, options: { Create: true, Edit: true, View: true, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Applicants', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "Support",
      roleName: "Support Specialist",
      description: "Provides technical support and assistance",
      policies: [
        { name: 'Role', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'User Account', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Email Template', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Applicants', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "QA",
      roleName: "Quality Assurance",
      description: "Ensures the quality of software applications",
      policies: [
        { name: 'Role', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'User Account', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: true, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Email Template', checked: true, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Applicants', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "Finance",
      roleName: "Finance Officer",
      description: "Manages financial transactions and reports",
      policies: [
        { name: 'Role', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'User Account', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Email Template', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Applicants', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "Admin",
      roleName: "Administrator",
      description: "Manages the entire system",
      policies: [
        { name: 'Role', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Employee', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'User Account', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Section Formatting', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Email Template', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Career Vacancies', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } },
        { name: 'Applicants', checked: true, options: { Create: true, Edit: true, View: true, Delete: true, Restore: true } }
      ]
    },
    {
      roleCode: "Receptionist",
      roleName: "Receptionist",
      description: "Handles front desk and visitor management",
      policies: [
        { name: 'Role', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'User Account', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Email Template', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Applicants', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } }
      ]
    },
    {
      roleCode: "ITSupport",
      roleName: "IT Support",
      description: "Provides IT support and system maintenance",
      policies: [
        { name: 'Role', checked: false, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Employee', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'User Account', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Section Formatting', checked: true, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Email Template', checked: true, options: { Create: false, Edit: false, View: true, Delete: false, Restore: false } },
        { name: 'Career Vacancies', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } },
        { name: 'Applicants', checked: false, options: { Create: false, Edit: false, View: false, Delete: false, Restore: false } }
      ]
    }
  ];
  

  myColumns = [
    { key: 'roleCode', header: 'Code' }, // changed from code to roleCode
    { key: 'roleName', header: 'Role Name' },
    { key: 'description', header: 'Description' },
    { key: 'actions', header: 'Actions' }
  ];

  createModalData: FormConfig = {
    title: 'Role Create',
    fields: [
      { key: 'roleCode', label: 'Role Code', type: 'text', required: true },
      { key: 'roleName', label: 'Role Name', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'text' },
    ],
    policies: [
      { name: 'Role', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
      { name: 'Employee', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
      { name: 'User Account', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
      { name: 'Section Formatting', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
      { name: 'Email Template', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
      { name: 'Career Vacancies', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] },
      { name: 'Applicants', options: ['Create', 'Edit', 'View', 'Delete', 'Restore'] }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
