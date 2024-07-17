import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { navBarItem } from './nav-bar-route';
import { NavBarMobileViewComponent } from './nav-bar-mobile-view/nav-bar-mobile-view.component';

@Component({
  selector: 'sscgi-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UpperCasePipe,
    MatIconModule,
    MatSidenavModule,
    NavBarMobileViewComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  navBarItem = navBarItem;

}
