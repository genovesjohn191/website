import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { UserAccountService } from '../user-management/user-management-service/User-Account/user-account.service';
import { DashboardUserAccount } from '../../../shared/interfaces/dashboard-model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AgCharts, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public options: AgChartOptions;
  public userOptions: AgChartOptions;
  public rolesOptions: AgChartOptions;
  public applicationStatusOptions: AgChartOptions;
  public jobVacancyApplicationsOptions: AgChartOptions;

  deletedUserAccounts: DashboardUserAccount[] = [];
  userAccounts: DashboardUserAccount[] = [];
  roleData = [];
  
  data = [
    { asset: "Active Pages", number: 22 },
    { asset: "Deleted Pages", number: 8 },
  ];

  activePages = [
    { title: "Homepage", description: "The main entry point of the website.", url: "/home" },
    { title: "About Us", description: "Information about our company.", url: "/about" },
    { title: "Services", description: "Details of the services we offer.", url: "/services" },
    { title: "Contact", description: "How to get in touch with us.", url: "/contact" },
    { title: "Contact", description: "How to get in touch with us.", url: "/contact" }
  ];

  public applications = [
    { ApplicantName: "John Doe", Position: "Software Engineer", Status: "Pending", Date: "2024-10-01" },
    { ApplicantName: "Jane Smith", Position: "Product Manager", Status: "Approved", Date: "2024-09-28" },
    { ApplicantName: "Michael Brown", Position: "UI/UX Designer", Status: "Rejected", Date: "2024-10-02" },
    { ApplicantName: "Emily Johnson", Position: "Data Analyst", Status: "Pending", Date: "2024-09-30" },
    { ApplicantName: "David Wilson", Position: "Marketing Specialist", Status: "Approved", Date: "2024-09-27" },
  ];

  public jobVacancies = [
    { title: "Software Engineer", status: "Open", numberOfApplications: 2 },
    { title: "Product Manager", status: "Open", numberOfApplications: 1 },
    { title: "UI/UX Designer", status: "Closed", numberOfApplications: 1 },
    { title: "Data Analyst", status: "Open", numberOfApplications: 1 },
    { title: "Marketing Specialist", status: "Open", numberOfApplications: 0 },
    { title: "DevOps Engineer", status: "Open", numberOfApplications: 0 },
    { title: "Project Manager", status: "Closed", numberOfApplications: 0 },
    { title: "Data Scientist", status: "Open", numberOfApplications: 0 },
    { title: "Frontend Developer", status: "Open", numberOfApplications: 0 },
    { title: "Backend Developer", status: "Closed", numberOfApplications: 0 },
  ];

  public applicationStatusData = [
    { status: "Pending", number: 30 },
    { status: "Approved", number: 50 },
    { status: "Rejected", number: 20 },
  ];

  userData = [];

  constructor(private _userAccService: UserAccountService, private changeDetectorRef: ChangeDetectorRef) {
    this.setupCharts();
    this.fetchUserAccounts();
  }

  private setupCharts() {
    // Pie chart for page data
    this.options = this.createPieChartOptions(this.data, "asset", "number", ['#166534', '#dc3545'], ['#28a745', '#dc3545']);

    // Pie chart for application status
    this.applicationStatusOptions = this.createPieChartOptions(this.applicationStatusData, "status", "number", ['#007bff', '#28a745', '#dc3545'], ['#0056b3', '#28a745', '#dc3545']);

    // Bar chart for job vacancy applications
    this.jobVacancyApplicationsOptions = {
      data: this.jobVacancies,
      background: {
        fill: 'transparent'
      },
      series: [
        {
          type: "bar",
          xKey: "title",
          yKey: "numberOfApplications",
          yName: "Applicant",
          direction: 'vertical',
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  private createPieChartOptions(data: any[], labelKey: string, angleKey: string, fills: string[], strokes: string[]): AgChartOptions {
    return {
      data: data,
      background: {
        fill: 'transparent'
      },
      series: [
        {
          type: "pie",
          calloutLabelKey: labelKey,
          angleKey: angleKey,
          fills: fills,
          strokes: strokes,
        },
      ],
    };
  }

  private fetchUserAccounts() {
    forkJoin({
      userAccounts: this._userAccService.getUserAccount(),
      deletedUserAccounts: this._userAccService.getDeletedUserAccount(),
    }).subscribe({
      next: ({ userAccounts, deletedUserAccounts }) => {
        this.userAccounts = userAccounts;
        this.deletedUserAccounts = deletedUserAccounts;
        
        this.updateRoleData();
        this.updateUserData();
      },
      error: (err) => {
        console.error('Error fetching user accounts or deleted accounts:', err);
      }
    });
  }

  private updateRoleData() {
    const roleCountMap: { [roleName: string]: number } = {};

    this.userAccounts.forEach(({ userId, roleName, firstName, middleName, lastName }) => {
      console.log(userId);
      console.log(roleName);
      console.log(`${firstName} ${middleName} ${lastName}`);

      // Replace with logic to fetch dynamic role if needed
      const dynamicRoleName = roleName || "admin";

      // Count occurrences of each roleName
      roleCountMap[dynamicRoleName] = (roleCountMap[dynamicRoleName] || 0) + 1;
    });

    this.roleData = Object.keys(roleCountMap).map(role => ({
      role: role,
      count: roleCountMap[role]
    }));

    // Set up rolesOptions
    this.rolesOptions = {
      data: this.roleData,
      background: {
        fill: 'transparent'
      },
      series: [
        {
          type: "bar",
          xKey: "role",
          yKey: "count",
          yName: "Users",
          direction: 'horizontal',
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  private updateUserData() {
    this.userData = [
      { id: 1, status: "Active Accounts", number: this.userAccounts.length },
      { id: 2, status: "Deleted Accounts", number: this.deletedUserAccounts.length },
    ];

    // Pie chart for user data
    this.userOptions = this.createPieChartOptions(this.userData, "status", "number", ['#166534', '#dc3545'], ['#0056b3', '#dc3545']);
  }
}
