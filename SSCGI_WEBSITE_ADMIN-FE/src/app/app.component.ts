import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementService } from './features/tabs/user-management/user-management-service/user-management.service';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterOutlet,MatSidenavModule, MatListModule, MatIconModule, CommonModule, MatExpansionModule, RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{


  ngOnInit(): void {
  }

}
