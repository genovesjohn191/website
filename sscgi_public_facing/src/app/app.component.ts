import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderNavComponent } from './core/header/header.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { NavBarMobileViewComponent } from './core/header/nav-bar/nav-bar-mobile-view/nav-bar-mobile-view.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './core/footer/footer.component';
import { WidgetComponent } from './core/widget/widget.component';
import { DynamicPageComponent } from './features/dynamic-page/dynamic-page.component';
import { MatDialog } from '@angular/material/dialog';
import { DataPrivacyModalComponent } from './features/dynamic-page/data-privacy-modal/data-privacy-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderNavComponent,
    FooterComponent,
    WidgetComponent,
    DynamicPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

  
}
