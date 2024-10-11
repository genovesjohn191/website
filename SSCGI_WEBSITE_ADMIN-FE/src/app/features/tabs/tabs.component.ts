import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tab, SubTab } from "../../shared/interfaces/tabs-model"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './user-management/user-management-service/Employee/employee.service';
import { RoleService } from './user-management/user-management-service/Role/role.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatListModule, MatIconModule, CommonModule, MatExpansionModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit {
  title = 'SSCGI-WEBSITE-ADMINFE';
  activeTab: SubTab = { name: '', link: '', icon: '', active: false };
  showSidebar: boolean = true;
  sidebar: boolean = window.innerWidth <= 1350;
  showLabels: boolean = window.innerWidth <= 1350;
  personId: any;
  roleId: any;
  data: any = {};
  roleData: any = {};
  rolePolicy: any[] = [];

  collapsableTabs: Tab[] = [];
  bottomTabs: SubTab[] = [];

  constructor(private router: Router, private _employeeService: EmployeeService, private _roleService: RoleService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !this.router.url.includes('login');
      }
    });
  }

  ngOnInit(): void {
    this.personId = localStorage.getItem('personId');
    const roleId = localStorage.getItem('roleId');
    this.getPeopleById(this.personId);
    this.getRoleById(roleId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sidebar = window.innerWidth <= 1350;
    this.showLabels = window.innerWidth <= 1350;
  }

  setActiveTabByUrl(url: string): void {
    console.log(url)
    const allTabs = [...this.collapsableTabs.flatMap(tab => tab.subtabs), ...this.bottomTabs];
    console.log(allTabs)
    const foundTab = allTabs.find(tab => url.includes(tab.link));
    if (foundTab) {
      this.activeTab = foundTab;
    } else {
      this.activeTab = { name: '', link: '', icon: '', active: false };
    }
  }

  toggleTab(tab: Tab): void {
    tab.expanded = !tab.expanded;
    this.sidebar = false;
    this.showLabels = false;
  }

  toggleSidebar(): void {
    this.sidebar = !this.sidebar;
    if(!this.showLabels){
      this.showLabels = !this.showLabels;
    }else{
      setTimeout(() => {
        this.showLabels = !this.showLabels;
      }, 200); // 300ms delay
    }

  }

  setActiveTab(subtab: SubTab) {
    this.activeTab = subtab;
    this.storeRolePolicyId(subtab.name); 
  }

  storeRolePolicyId(subTabName: string) {
    const policy = this.rolePolicy.find(policy => policy.rolePolicyName === subTabName && policy.isChecked);
    if (policy) {
      localStorage.setItem('selectedRolePolicyId', policy.rolePolicyId);
    }else {
    }
  }
  

  getPeopleById(personId: any) {
    this._employeeService.getPeopleById(personId).subscribe(data => {
      this.data = data[0];
    });
  }

  getRoleById(roleId: any) {
    this._roleService.getRoleById(roleId).subscribe(data => {
      this.roleData = data;
      const roleString = JSON.stringify(this.roleData)
      localStorage.setItem("RoleData", roleString)
      this.rolePolicy = this.roleData.policies;
  
      // Setup tabs first
      this.setupTabsBasedOnRolePolicies();
  
      // Now call setActiveTabByUrl to make sure it's executed after setup
      const currentUrl = this.router.url;
      this.setActiveTabByUrl(currentUrl);
    });
  }

  setupTabsBasedOnRolePolicies(): void {
    // Define a mapping of rolePolicyNames to subtabs
    const policyToTabMapping: { [key: string]: SubTab } = {
      'Role': { name: 'Role', link: '/tabs/user-management/role-management', icon: 'assets/Images/Hierarchy.png', active: false },
      'Employee': { name: 'Employee', link: '/tabs/user-management/employee-management', icon: 'assets/Images/Badge.png', active: false },
      'User Account': { name: 'User Account', link: '/tabs/user-management/user-account', icon: 'assets/Images/Male User.png', active: false },
      'Section Formatting': { name: 'Section Formatting', link: '/tabs/system-setup/section-formatting', icon: 'assets/Images/Web Design.png', active: false },
      'Email Template': { name: 'Email Template', link: '/tabs/system-setup/email-template', icon: 'assets/Images/Document Header.png', active: false },
      'Career Vacancies': { name: 'Career Vacancies', link: '/tabs/transactions/career-vacancies', icon: 'assets/Images/New Job.png', active: false },
      'Applicants': { name: 'Applicants', link: '/tabs/transactions/applicants', icon: 'assets/Images/Applicant.png', active: false }
    };

    // Create the main tabs with subtabs based on role policies
    const userManagementTabs = this.rolePolicy
      .filter(policy => ['Role', 'Employee', 'User Account'].includes(policy.rolePolicyName) && policy.isChecked)
      .map(policy => policyToTabMapping[policy.rolePolicyName]);

    const systemSetupTabs = this.rolePolicy
      .filter(policy => ['Section Formatting', 'Email Template'].includes(policy.rolePolicyName) && policy.isChecked)
      .map(policy => policyToTabMapping[policy.rolePolicyName]);

    const transactionsTabs = this.rolePolicy
      .filter(policy => ['Career Vacancies', 'Applicants'].includes(policy.rolePolicyName) && policy.isChecked)
      .map(policy => policyToTabMapping[policy.rolePolicyName]);

    // Assign the tabs to collapsableTabs, only if they have subtabs
    this.collapsableTabs = [
      {
        name: 'User Management',
        icon: 'assets/Images/Admin Settings Male.png',
        subtabs: userManagementTabs,
        expanded: false
      },
      {
        name: 'System Setup',
        icon: 'assets/Images/Support.png',
        subtabs: systemSetupTabs,
        expanded: false
      },
      {
        name: 'Transactions',
        icon: 'assets/Images/Gears.png',
        subtabs: transactionsTabs,
        expanded: false
      }
    ].filter(tab => tab.subtabs.length > 0); // Filter out tabs without subtabs

    // Define bottom navigation tabs
    this.bottomTabs = [
      { name: 'Dashboard', link: '/tabs/dashboard', icon: 'assets/Images/dashboard.png', active: false },
      { name: 'My Profile', link: '/tabs/my-profile', icon: 'assets/Images/User.png', active: false },
      { name: 'Setup Security', link: '/tabs/setup-security', icon: 'assets/Images/Protect.png', active: false },
      { name: 'Logout', link: '/login', icon: 'assets/Images/Logout.png', active: false }
    ];
  }
}
