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
import { CRUDmodalComponent } from '../crudmodal/crudmodal.component';

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
    // console.log(this.displayedColumns)  
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

  openCrudModal(data:any, mode:string):void{
    const dialogWidth = mode === 'delete' ? '30vw' : '70vw';
    const dialogRef = this.matDialog.open(CRUDmodalComponent,{
      width:dialogWidth,
      data:{
        details: data,
        module: this.module,
        form:this.createModalData,
        mode: mode
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  redirectTo(path:string): void {
    this.router.navigate([this.link+path]);
  }
}
