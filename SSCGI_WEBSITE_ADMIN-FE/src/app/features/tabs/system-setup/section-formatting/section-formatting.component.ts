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
import { TableComponent } from '../../../../shared/components/table/table.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';


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
    MatCardModule,
    RouterModule
  ],
  templateUrl: './section-formatting.component.html',
  styleUrls: ['./section-formatting.component.css'] // Corrected from styleUrl
})
export class SectionFormattingComponent implements OnInit { 
<<<<<<< Updated upstream
  module = 'section formatting'
=======
  private editor: any;
 module = 'section-formatting'
>>>>>>> Stashed changes
  link = "system-setup/section-formatting/"
  myData = [
    { page: '1', sectionName: "Page Builder"},
    { page: '2', sectionName: "Careers"},
    { page: '3', sectionName: "Contact Us" },
  ];

  myColumns = [
    { key: 'page', header: 'No.' },
    { key: 'sectionName', header: 'Section Name' },
    { key: 'actions', header: 'Actions' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }


  navigateToPageBuilder(){
    this.router.navigate(['/tabs/system-setup/section-formatting/page-builder'])
  }

  navigateToPageView(){
    this.router.navigate(['/tabs/system-setup/section-formatting/view-page'])
  }
}


