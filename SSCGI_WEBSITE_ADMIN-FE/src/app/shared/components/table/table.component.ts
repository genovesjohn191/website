import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, AfterViewInit, input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
import { UserManagementService } from '../../../features/tabs/user-management/user-management-service/user-management.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatTooltipModule,
    MatProgressSpinnerModule
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
  @Output() submitTriggered = new EventEmitter<[any, string]>();
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

    // Permission properties
    canView: boolean = false;
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    canRestore: boolean = false;

  searchTerm: string = '';
  loading: boolean = true;
  callBack: boolean = false;
  constructor(private matDialog: MatDialog, private router: Router, private service: UserManagementService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.dataSource.data = this.data;
    }
  }

  ngOnInit(): void {
    this.loadData();
    this.displayedColumns = this.columns.map(col => col.key);
    const rolePolicyId = localStorage.getItem("selectedRolePolicyId")
    this.getRoleControl(rolePolicyId);
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


  openCrudModal(data: any, mode: string): void {
    const dialogWidth = mode === 'delete' ? '30vw' : '70vw';
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
    this.service.personId = personId;

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

  getRoleControl(rolePolicyId: any) {
    this.service.getRolePolicyControlById(rolePolicyId).subscribe(data => {
          // Set permissions based on the response
          this.canView = data[0].canView;
          this.canCreate = data[0].canCreate;
          this.canEdit = data[0].canEdit;
          this.canDelete = data[0].canDelete;
          this.canRestore = data[0].canRestore;
    })
  }
}
