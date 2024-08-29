import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Component, Input, OnInit, ViewChild, AfterViewInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule } from '@angular/material/icon';           
import { MatInputModule } from '@angular/material/input';         
=======
import { Component, Input, OnInit, ViewChild, AfterViewInit, input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
>>>>>>> master
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CRUDmodalComponent } from '../crudmodal/crudmodal.component';
<<<<<<< HEAD
=======
import { UserManagementService } from '../../../features/user-management/user-management-service/user-management.service';
import { MatTooltipModule } from '@angular/material/tooltip';
>>>>>>> master

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
<<<<<<< HEAD
    MatIconModule,      
    MatFormFieldModule, 
    MatInputModule,     
=======
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
>>>>>>> master
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    RouterModule,
<<<<<<< HEAD
=======
    MatTooltipModule
>>>>>>> master
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
<<<<<<< HEAD
export class TableComponent implements OnInit, AfterViewInit { 
=======
export class TableComponent implements OnInit, AfterViewInit {
>>>>>>> master
  @Input() data: any[] = [];
  @Input() columns: { key: string, header: string }[] = [];
  @Input() link: string = '';
  @Input() module: string = ''
  @Input() createModalData: any = {};
<<<<<<< HEAD
  
  displayedColumns: string[] = []; 
=======
  @Output() submitTriggered = new EventEmitter<any>();
  displayedColumns: string[] = [];
>>>>>>> master
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  searchTerm: string = '';

<<<<<<< HEAD
  constructor(private matDialog: MatDialog, private router: Router) {}
=======
  constructor(private matDialog: MatDialog, private router: Router, private service: UserManagementService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.dataSource.data = this.data;
    }
  }
>>>>>>> master

  ngOnInit(): void {
    // console.log(this.link)
    this.displayedColumns = this.columns.map(col => col.key);
<<<<<<< HEAD
    this.dataSource.data = this.data;
    // console.log(this.displayedColumns)  
    // console.log(this.dataSource.data)
  }

  ngAfterViewInit() { 
=======

    // console.log(this.displayedColumns)  

  }

  ngAfterViewInit() {
>>>>>>> master
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

<<<<<<< HEAD
  openCrudModal(data:any, mode:string):void{
    const dialogWidth = mode === 'delete' ? '30vw' : '70vw';
    const dialogRef = this.matDialog.open(CRUDmodalComponent,{
      width:dialogWidth,
      data:{
        details: data,
        module: this.module,
        form:this.createModalData,
=======
  openCrudModal(data: any, mode: string): void {
    const dialogWidth = mode === 'delete' ? '30vw' : '70vw';
    const dialogRef = this.matDialog.open(CRUDmodalComponent, {
      width: dialogWidth,
      data: {
        details: data,
        module: this.module,
        form: this.createModalData,
>>>>>>> master
        mode: mode
      }
    });
    dialogRef.afterClosed().subscribe(result => {
<<<<<<< HEAD
      
    });
  }

  redirectTo(path:string): void {
    this.router.navigate([this.link+path]);
=======

      if (result == null) {

      } else {
        this.submitTriggered.emit(result); // Emit the result when the modal is closed 
      }

    });
  }

  redirectTo(path: string): void {
    this.router.navigate([this.link + path]);
>>>>>>> master
  }
}
