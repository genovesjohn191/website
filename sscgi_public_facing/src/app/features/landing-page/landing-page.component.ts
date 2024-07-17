import { Component } from '@angular/core';
import { NavBarMobileViewComponent } from '../../core/header/nav-bar/nav-bar-mobile-view/nav-bar-mobile-view.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ScreenSizeService } from '../../shared/services/screen-size';
import { HomegrownSolutionsPageComponent } from './homegrown-solutions-page/homegrown-solutions-page.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { WidgetComponent } from '../../core/widget/widget.component';
import { PartneredSolutionsPageComponent } from './partnered-solutions-page/partnered-solutions-page.component';

@Component({
  selector: 'sscgi-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    NavBarMobileViewComponent,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    HomegrownSolutionsPageComponent,
    FooterComponent,
    WidgetComponent,
    PartneredSolutionsPageComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  screenSize: string;

  constructor(private screenSizeService: ScreenSizeService) {}

  ngOnInit(): void {
    this.screenSizeService.currentScreenSize.subscribe(size => {
      this.screenSize = size;
    });
  }
  
  landingBGPath = "assets/landing-page-bg.jpg";
  landingBGMobileViewPath = "assets/landing-bg-mobile-view.png";
  mainText = [{
    topText:"We Design,",
    bottomText:"You Decide"
}]
  subText= "Our aspiration is to provide customers with more value that exceeds their expectations and putting our customers at the center of what we do. “We Design, You Decide” is our vision for the future.";
}
