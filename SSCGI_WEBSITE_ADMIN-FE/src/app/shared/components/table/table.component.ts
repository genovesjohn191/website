import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, AfterViewInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule } from '@angular/material/icon';           
import { MatInputModule } from '@angular/material/input';         
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CreateModalComponent } from '../create-modal/create-modal.component';
import { ViewModalComponent } from '../view-modal/view-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

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
  @Input() createModalData: any = {};
  
  displayedColumns: string[] = []; 
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  searchTerm: string = '';

  constructor(private matDialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    // console.log(this.link)
    this.displayedColumns = this.columns.map(col => col.key);
    this.dataSource.data = this.data;
     console.log(this.displayedColumns)  
    // console.log(this.dataSource.data)
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
    // console.log('Delete', element);
    // Implement delete functionality here
  }

  openEditModal(data:any):void{
    // console.log(data)
    const dialogRef = this.matDialog.open(EditModalComponent,{
      width:'70vw',
      data:{
        details: data,
        module: this.module,
        form:this.createModalData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  openCreateModal(): void {
    const dialogRef = this.matDialog.open(CreateModalComponent, {
      width: '70vw',
      data: {
        ...this.createModalData,
        module: this.module,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
  

  openViewModal(data:any): void{
    // console.log(data)
    const dialogRef = this.matDialog.open(ViewModalComponent,{
      width:'70vw',
      data:{
        details: data,
        module: this.module,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  redirectTo(path:string): void {
    this.router.navigate([this.link+path]);
  }
}
