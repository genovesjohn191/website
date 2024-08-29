import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule } from '@angular/material/icon';           
import { MatInputModule } from '@angular/material/input';         
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-section-formatting',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,      
    MatFormFieldModule, 
    MatInputModule,     
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    TableComponent,
  ],
  templateUrl: './section-formatting.component.html',
  styleUrls: ['./section-formatting.component.css'] // Corrected from styleUrl
})
export class SectionFormattingComponent implements OnInit { 
 module = 'section-formatting'
  link = "system-setup/section-formatting/"
  myData = [
    { page: 'Home', sectionName: "Home Grown Solution", sequenceNumber: "1" },
    { page: 'Home', sectionName: "Welcome Message", sequenceNumber: "2" },
    { page: 'Career', sectionName: "Job Openings", sequenceNumber: "1" },
    { page: 'Career', sectionName: "Application Process", sequenceNumber: "2" },
    { page: 'Career', sectionName: "Employee Testimonials", sequenceNumber: "3" },
    { page: 'Home', sectionName: "Our Services", sequenceNumber: "3" },
    { page: 'Home', sectionName: "Testimonials", sequenceNumber: "4" },
    { page: 'Career', sectionName: "Internships", sequenceNumber: "4" },
    { page: 'Career', sectionName: "Career Growth", sequenceNumber: "5" },
    { page: 'Home', sectionName: "Contact Information", sequenceNumber: "5" },
    { page: 'Home', sectionName: "Latest News", sequenceNumber: "6" },
    { page: 'Career', sectionName: "Job Benefits", sequenceNumber: "6" },
    { page: 'Home', sectionName: "Upcoming Events", sequenceNumber: "7" },
    { page: 'Home', sectionName: "Photo Gallery", sequenceNumber: "8" },
    { page: 'Career', sectionName: "Training Programs", sequenceNumber: "7" },
    { page: 'Career', sectionName: "Career FAQs", sequenceNumber: "8" },
    { page: 'Career', sectionName: "Alumni Network", sequenceNumber: "9" },
    { page: 'Home', sectionName: "Recent Projects", sequenceNumber: "9" },
    { page: 'Home', sectionName: "Our Mission", sequenceNumber: "10" },
    { page: 'Career', sectionName: "Recruitment Events", sequenceNumber: "10" }
  ];

  myColumns = [
    { key: 'page', header: 'Page' },
    { key: 'sectionName', header: 'Section Name' },
    { key: 'sequenceNumber', header: 'Sequence Number' },
    { key: 'actions', header: 'Actions' }
  ];

  constructor() {}

  ngOnInit(): void {}
}


