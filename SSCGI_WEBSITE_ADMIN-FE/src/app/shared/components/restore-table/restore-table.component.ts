import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CRUDmodalComponent } from '../crudmodal/crudmodal.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeService } from '../../../features/tabs/user-management/user-management-service/Employee/employee.service';

@Component({
  selector: 'app-restore-table',
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
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './restore-table.component.html',
  styleUrl: './restore-table.component.css'
})
export class RestoreTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string, header: string }[] = [];
  @Input() isRestore: boolean
  @Input() link: string = '';
  @Input() module: string = ''
  @Input() createModalData: any = {};
  @Output() submitTriggered = new EventEmitter<[any, string]>();
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  roleData:any 
  searchTerm: string = '';
  loading: boolean = true;
  callBack: boolean = false;
  @Output() isRestoreChange = new EventEmitter<boolean>();
  constructor(private matDialog: MatDialog, private router: Router, private _employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.dataSource.data = this.data;
    }
    
  }

  ngOnInit(): void {
    this.loadData();
    this.displayedColumns = this.columns.map(col => col.key);
    const roleString = localStorage.getItem("RoleData")
    if(roleString != null){
      this.roleData = JSON.parse(roleString);
    }
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

  loadData(): void {
    this.loading = true;
    this.callBack = false; // Hide callback message initially

    // Simulate data loading with a delay
    setTimeout(() => {
      // Replace this with actual data fetching
      this.dataSource.data = this.data;
      this.loading = false; // Data has been loaded
    });
  }

  onRestore() {
    this.isRestore = false;
    // console.log(this.isRestore)
    this.isRestoreChange.emit(this.isRestore);
  }

  openCrudModal(data: any, mode: string): void {
    const dialogWidth = mode === 'restore' ? '30vw' : '70vw';
    const dialogRef = this.matDialog.open(CRUDmodalComponent, {
      width: dialogWidth,
      data: {
        details: data,
        module: this.module,
        form: this.createModalData,
        mode: mode
      }

    });
    let personId: any;
    personId = data?.personId
    this._employeeService.personId = personId;

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {

      } else {
        this.submitTriggered.emit([result, mode]); // Emit the result when the modal is closed 
      }
    });
  }

  redirectTo(path: string): void {
    this.router.navigate([this.link + path]);
  }

}
