import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tab, SubTab } from "../../shared/interfaces/tabs-model" 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterOutlet,MatSidenavModule, MatListModule, MatIconModule, CommonModule, MatExpansionModule, RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  title = 'SSCGI-WEBSITE-ADMINFE';
  activeTab: SubTab = { name: '', link: '', icon: '', active: false };
  showSidebar: boolean = true;
  sidebar: boolean = window.innerWidth <= 1350;
  
  collapsableTabs: Tab[] = [
    {
      name: 'User Management',
      icon: 'assets/Images/Admin Settings Male.png',
      subtabs: [
        { name: 'Role Management', link: '/tabs/user-management/role-management', icon: 'assets/Images/Hierarchy.png', active: false },
        { name: 'Employee Management', link: '/tabs/user-management/employee-management', icon: 'assets/Images/Badge.png', active: false },
        { name: 'User Account Management', link: '/tabs/user-management/user-account', icon: 'assets/Images/Male User.png', active: false },
      ],
      expanded: false
    },
    {
      name: 'System Setup',
      icon: 'assets/Images/Support.png',
      subtabs: [
        { name: 'Section Formatting', link: '/tabs/system-setup/section-formatting', icon: 'assets/Images/Web Design.png', active: false },
        { name: 'Email Template', link: '/tabs/system-setup/email-template', icon: 'assets/Images/Document Header.png', active: false },
      ],
      expanded: false
    },
    {
      name: 'Transactions',
      icon: 'assets/Images/Gears.png',
      subtabs: [
        { name: 'Career Vacancies', link: '/tabs/transactions/career-vacancies', icon: 'assets/Images/New Job.png', active: false },
        { name: 'Applicants', link: '/tabs/transactions/applicants', icon: 'assets/Images/Applicant.png', active: false },
      ],
      expanded: false
    },
  ];

  bottomTabs: SubTab[]= [
      { name: 'My Profile', link: '/my-profile', icon: 'assets/Images/User.png', active: false },
      { name: 'Setup Security', link: '/setup-security', icon: 'assets/Images/Protect.png', active: false },
      { name: 'Logout', link: '/login', icon: 'assets/Images/Logout.png', active: false } 
  ]

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !this.router.url.includes('login');
        this.setActiveTabByUrl(event.url);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sidebar = window.innerWidth <= 1350;
    console.log(this.sidebar)
  }

  setActiveTabByUrl(url: string): void {
    const allTabs = [...this.collapsableTabs.flatMap(tab => tab.subtabs), ...this.bottomTabs];
    const foundTab = allTabs.find(tab => url.includes(tab.link));
    if (foundTab) {
      this.activeTab = foundTab;
    } else {
      this.activeTab = { name: '', link: '', icon: '', active: false }; // Default empty tab
    }
  }

  toggleTab(tab: Tab): void {
    tab.expanded = !tab.expanded;
    this.sidebar = false
  }

  toggleSidebar(): void {
    this.sidebar = !this.sidebar;
    console.log(this.sidebar);
    this.collapsableTabs.forEach((tab:any)=>{
      tab.expanded = false
    })
  }

  setActiveTab(tab:SubTab){
    this.activeTab = tab
  }
}
