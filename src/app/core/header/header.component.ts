import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NavBarMobileViewComponent } from './nav-bar/nav-bar-mobile-view/nav-bar-mobile-view.component';


@Component({
  selector: 'sscgi-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    UpperCasePipe,
    NavBarComponent,
    MatSidenavModule,
    MatIconModule,
    NavBarMobileViewComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderNavComponent {

  @ViewChild('sidenav') sidenav!: NavBarMobileViewComponent;


  title = "Systems and software Consulting Group Inc.";
  logoPath = 'assets/sscgi-logo.png';

  toggleSidenav() {
    this.sidenav.sidenav.toggle();
  }
}
