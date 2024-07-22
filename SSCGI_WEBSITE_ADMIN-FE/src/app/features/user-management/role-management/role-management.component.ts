import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  link = "usermanagement/role-management"
  module = 'role-management'
  icon = '/assets/Images/Hierarchy.png'
  myData = [
    { code: "Admin", roleName: "Admin", description: "Administrator with full access" },
    { code: "Editor", roleName: "Editor", description: "Can edit content" },
    { code: "Viewer", roleName: "Viewer", description: "Can view content" },
    { code: "Moderator", roleName: "Moderator", description: "Can moderate user content" },
    { code: "Contributor", roleName: "Contributor", description: "Can contribute new content" },
    { code: "Analyst", roleName: "Analyst", description: "Can analyze data" },
    { code: "Manager", roleName: "Manager", description: "Manages teams and projects" },
    { code: "Support", roleName: "Support", description: "Provides support to users" },
    { code: "Guest", roleName: "Guest", description: "Limited access for guests" },
    { code: "SuperAdmin", roleName: "Super Admin", description: "Super administrator with highest privileges" },
    { code: "HR", roleName: "HR", description: "Handles human resources" },
    { code: "Finance", roleName: "Finance", description: "Manages financial tasks" },
    { code: "IT", roleName: "IT", description: "Handles IT related tasks" },
    { code: "Marketing", roleName: "Marketing", description: "Manages marketing strategies" },
    { code: "Sales", roleName: "Sales", description: "Manages sales operations" },
    { code: "CustomerService", roleName: "Customer Service", description: "Handles customer queries" },
    { code: "Operations", roleName: "Operations", description: "Oversees daily operations" },
    { code: "Legal", roleName: "Legal", description: "Handles legal matters" },
    { code: "Research", roleName: "Research", description: "Conducts research" },
    { code: "Development", roleName: "Development", description: "Involved in development tasks" }
  ];

  myColumns = [
    { key: 'code', header: 'Code' },
    { key: 'roleName', header: 'Role Name' },
    { key: 'description', header: 'Description' },
    { key: 'actions', header: 'Actions' }
  ];

  createModalData: any = {
    title: 'Role Create',
    fields: [
      { key: 'roleCode', label: 'Role Code', type: 'text', required: true },
      { key: 'roleName', label: 'Role Name', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' }
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
