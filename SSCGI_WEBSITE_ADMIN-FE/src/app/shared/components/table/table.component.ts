import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule } from '@angular/material/icon';           
import { MatInputModule } from '@angular/material/input';         
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CreateModalComponent } from '../create-modal/create-modal.component';

@Component({
  selector: 'app-table',
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
    RouterModule,
    CreateModalComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit { 
  @Input() data: any[] = [];
  @Input() columns: { key: string, header: string }[] = [];
  @Input() link: string = '';
  @Input() module: string = ''
  
  displayedColumns: string[] = []; 
  dataSource = new MatTableDataSource<any>(this.data);
  create = this.link +"create"
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  searchTerm: string = '';

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
  
    console.log(this.link)
    this.displayedColumns = this.columns.map(col => col.key);
    this.dataSource.data = this.data;
    console.log(this.displayedColumns)  
    console.log(this.dataSource.data)
  }

  ngAfterViewInit() { 
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteElement(element: any): void {
    console.log('Delete', element);
    // Implement delete functionality here
  }

  editElement(element: any): void {
    console.log('Edit', element);
    // Implement edit functionality here
  }

  viewElement(element: any): void {
    console.log('View', element);
    // Implement view functionality here
  }

  openCreateModal(): void {
    const dialogRef = this.matDialog.open(CreateModalComponent, {
      width: "1000px",
      data: { /* You can pass data here if needed */ }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result if needed
    });
  }

}
