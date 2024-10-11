import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

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
  data = [
    { asset: "Active Pages", number: 22 },
    { asset: "Deleted Pages", number: 8 },
  ];

  public roleData = [
    {
      role: "Admin",
      count: 14,
    },
    {
      role: "Editor",
      count: 24,
    },
    {
      role: "Viewer",
      count: 35,
    },
  ];

  public userAccounts = [
    { UserId: 1, Name: "Alice Smith", Role: "Admin" },
    { UserId: 2, Name: "Bob Johnson", Role: "Editor" },
    { UserId: 3, Name: "Charlie Brown", Role: "Viewer" },
    { UserId: 4, Name: "David Wilson", Role: "Admin" },
    { UserId: 5, Name: "Eva Green", Role: "Editor" },
    { UserId: 6, Name: "Frank White", Role: "Viewer" },
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


  activePages = [
    { title: "Homepage", description: "The main entry point of the website.", url: "/home" },
    { title: "About Us", description: "Information about our company.", url: "/about" },
    { title: "Services", description: "Details of the services we offer.", url: "/services" },
    { title: "Contact", description: "How to get in touch with us.", url: "/contact" },
    { title: "Contact", description: "How to get in touch with us.", url: "/contact" }
  ];

  public applicationStatusData = [
    { status: "Pending", number: 30 },
    { status: "Approved", number: 50 },
    { status: "Rejected", number: 20 },
  ];

  userData = [
    { id: 1, status: "Active Accounts", number: 85 },
    { id: 2, status: "Deleted Accounts", number: 5 },
  ];

  constructor() {
    // Pie chart for page data
    this.options = {
      data: this.data,
      background: {
        fill: 'transparent'
      },
      series: [
        {
          type: "pie",
          calloutLabelKey: "asset",
          angleKey: "number",
          fills: ['#166534', '#dc3545'],
          strokes: ['#28a745', '#dc3545'],
        },
      ],
    };

    // Pie chart for user data
    this.userOptions = {
      data: this.userData,
      background: {
        fill: 'transparent'
      },
      series: [
        {
          type: "pie",
          calloutLabelKey: "status",
          angleKey: "number",
          fills: ['#166534', '#dc3545'],
          strokes: ['#0056b3', '#dc3545'],
        },
      ],
    };

    // Bar chart for roles
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


    

        // Pie chart for application status
    this.applicationStatusOptions = {
      data: this.applicationStatusData,
      background: {
        fill: 'transparent'
      },
      series: [
        {
          type: "pie",
          calloutLabelKey: "status",
          angleKey: "number",
          fills: ['#007bff', '#28a745', '#dc3545'], // Customize colors as needed
          strokes: ['#0056b3', '#28a745', '#dc3545'],
        },
      ],
    };

    // Bar chart for job vacancy applications
    this.jobVacancyApplicationsOptions =  {
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
}
