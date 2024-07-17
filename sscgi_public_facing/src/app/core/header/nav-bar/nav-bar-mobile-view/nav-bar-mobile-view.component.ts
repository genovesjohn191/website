import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { navBarItem } from '../nav-bar-route';
import { LandingPageComponent } from '../../../../features/landing-page/landing-page.component';

@Component({
  selector: 'sscgi-nav-bar-mobile-view',
  standalone: true,
  imports: [
    UpperCasePipe,
    MatSidenavModule,
    RouterModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    LandingPageComponent
  ],
  templateUrl: './nav-bar-mobile-view.component.html',
  styleUrl: './nav-bar-mobile-view.component.css'
})
export class NavBarMobileViewComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  navBarItem = navBarItem;

  toggleSubItems(item: any) {
    item.isShowed = !item.isShowed;
  }
}
