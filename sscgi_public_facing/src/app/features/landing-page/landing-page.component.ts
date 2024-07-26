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
import { ServiceOfferedPageComponent } from './service-offered-page/service-offered-page.component';
import { SscgiService } from '../../sscgi.service';

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
    PartneredSolutionsPageComponent,
    ServiceOfferedPageComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  screenSize: string;
  dataStyles: any;

  titleTop:any;
  titleBottom:any;
  subText:any;
  leftButtonText:any;
  rightButtonText:any;
  landingBGPath:any;
  landingBGMobileViewPath:any;

  titleColor: string;
  subTextColor: string;
  titleFontFamily: string;
  titleFontSize: string;
  titleFontWeight: string;
  titleTextAlign: string;
  titleColor2: string;
  title2FontSize: string;
  title2FontWeight: string;
  subTextFontFamily: string;
  subTextFontSize: string;
  subTextFontWeight: string;

  landingPageLeftButtonBgColor;
  landingPageLeftButtonBorderColor;
  landingPageLeftButtonBorderStyle;
  landingPageLeftButtonBorderWidth;
  landingPageLeftButtonFontColor;
  landingPageLeftButtonFontWeight;
  landingPageLeftButtonFontSize;
  landingPageLeftButtonFontFamily;
  landingPageLeftButtonBorderRadius;

  landingPageRightButtonBgColor;
  landingPageRightButtonBorderColor;
  landingPageRightButtonBorderStyle;
  landingPageRightButtonBorderWidth;
  landingPageRightButtonFontColor;
  landingPageRightButtonFontWeight;
  landingPageRightButtonFontSize;
  landingPageRightButtonFontFamily;
  landingPageRightButtonBorderRadius;

  constructor(private screenSizeService: ScreenSizeService, private service: SscgiService) { }

  ngOnInit(): void {
    this.screenSizeService.currentScreenSize.subscribe(size => {
      this.screenSize = size;
    });

    this.getData();


  }



  changeStyle() {
    document.documentElement.style.setProperty('--landing-page-title-color', this.titleColor);
    document.documentElement.style.setProperty('--landing-page-title-color2', this.titleColor2);
    document.documentElement.style.setProperty('--landing-page-subtext-color', this.subTextColor);
    document.documentElement.style.setProperty('--landing-page-title-font-family', this.titleFontFamily);
    document.documentElement.style.setProperty('--landing-page-title-font-size', this.titleFontSize);
    document.documentElement.style.setProperty('--landing-page-title-font-weight', this.titleFontWeight);
    document.documentElement.style.setProperty('--landing-page-title-text-align', this.titleTextAlign);
    document.documentElement.style.setProperty('--landing-page-title2-font-size', this.title2FontSize);
    document.documentElement.style.setProperty('--landing-page-title2-font-weight', this.title2FontWeight);
    document.documentElement.style.setProperty('--landing-page-subtext-font-weight', this.subTextFontWeight);
    document.documentElement.style.setProperty('--landing-page-subtext-font-family', this.subTextFontFamily);
    document.documentElement.style.setProperty('--landing-page-subtext-font-size', this.subTextFontSize);

    document.documentElement.style.setProperty('--landing-page-left-button-bg-color', this.landingPageLeftButtonBgColor);
    document.documentElement.style.setProperty('--landing-page-left-button-border-color', this.landingPageLeftButtonBorderColor);
    document.documentElement.style.setProperty('--landing-page-left-button-border-style', this.landingPageLeftButtonBorderStyle);
    document.documentElement.style.setProperty('--landing-page-left-button-border-width', this.landingPageLeftButtonBorderWidth);
    document.documentElement.style.setProperty('--landing-page-left-button-font-color', this.landingPageLeftButtonFontColor);
    document.documentElement.style.setProperty('--landing-page-left-button-font-weight', this.landingPageLeftButtonFontWeight);
    document.documentElement.style.setProperty('--landing-page-left-button-font-size', this.landingPageLeftButtonFontSize);
    document.documentElement.style.setProperty('--landing-page-left-button-font-family', this.landingPageLeftButtonFontFamily);
    document.documentElement.style.setProperty('--landing-page-left-button-border-radius', this.landingPageLeftButtonBorderRadius);

    document.documentElement.style.setProperty('--landing-page-right-button-bg-color', this.landingPageRightButtonBgColor);
    document.documentElement.style.setProperty('--landing-page-right-button-border-color', this.landingPageRightButtonBorderColor);
    document.documentElement.style.setProperty('--landing-page-right-button-border-style', this.landingPageRightButtonBorderStyle);
    document.documentElement.style.setProperty('--landing-page-right-button-border-width', this.landingPageRightButtonBorderWidth);
    document.documentElement.style.setProperty('--landing-page-right-button-font-color', this.landingPageRightButtonFontColor);
    document.documentElement.style.setProperty('--landing-page-right-button-font-weight', this.landingPageRightButtonFontWeight);
    document.documentElement.style.setProperty('--landing-page-right-button-font-size', this.landingPageRightButtonFontSize);
    document.documentElement.style.setProperty('--landing-page-right-button-font-family', this.landingPageRightButtonFontFamily);
    document.documentElement.style.setProperty('--landing-page-right-button-border-radius', this.landingPageRightButtonBorderRadius);
  }


  getData() {
    this.service.getData().subscribe(data => {
      this.titleTop = data[0].titleTop;
      this.titleBottom = data[0].titleBottom;
      this.subText = data[0].subText;
      this.leftButtonText = data[0].leftButtonText;
      this.rightButtonText = data[0].rightButtonText;
      this.landingBGPath = data[0].landingBGPath;
      this.landingBGMobileViewPath = data[0].landingBGMobileViewPath;
  
      // Basic Title Styling
      this.titleColor = data[0].titleColor;
      this.subTextColor = data[0].subTextColor;
      this.titleFontFamily = data[0].titleFontFamily;
      this.titleFontSize = data[0].titleFontSize;
      this.titleFontWeight = data[0].titleFontWeight;
      this.titleTextAlign = data[0].titleTextAlign;
      this.titleColor2 = data[0].titleColor2;
      this.title2FontSize = data[0].title2FontSize;
      this.title2FontWeight = data[0].title2FontWeight;
      this.subTextFontFamily = data[0].subTextFontFamily;
      this.subTextFontSize = data[0].subTextFontSize;
      this.subTextFontWeight = data[0].subTextFontWeight;

      // Landing Page Left Button Styling
      this.landingPageLeftButtonBgColor = data[0].landingPageLeftButtonBgColor;
      this.landingPageLeftButtonBorderColor = data[0].landingPageLeftButtonBorderColor;
      this.landingPageLeftButtonBorderStyle = data[0].landingPageLeftButtonBorderStyle;
      this.landingPageLeftButtonBorderWidth = data[0].landingPageLeftButtonBorderWidth;
      this.landingPageLeftButtonFontColor = data[0].landingPageLeftButtonFontColor;
      this.landingPageLeftButtonFontWeight = data[0].landingPageLeftButtonFontWeight;
      this.landingPageLeftButtonFontSize = data[0].landingPageLeftButtonFontSize;
      this.landingPageLeftButtonFontFamily = data[0].landingPageLeftButtonFontFamily;
      this.landingPageLeftButtonBorderRadius = data[0].landingPageLeftButtonBorderRadius;

      // Landing Page Right Button Styling
      this.landingPageRightButtonBgColor = data[0].landingPageRightButtonBgColor;
      this.landingPageRightButtonBorderColor = data[0].landingPageRightButtonBorderColor;
      this.landingPageRightButtonBorderStyle = data[0].landingPageRightButtonBorderStyle;
      this.landingPageRightButtonBorderWidth = data[0].landingPageRightButtonBorderWidth;
      this.landingPageRightButtonFontColor = data[0].landingPageRightButtonFontColor;
      this.landingPageRightButtonFontWeight = data[0].landingPageRightButtonFontWeight;
      this.landingPageRightButtonFontSize = data[0].landingPageRightButtonFontSize;
      this.landingPageRightButtonFontFamily = data[0].landingPageRightButtonFontFamily;
      this.landingPageRightButtonBorderRadius = data[0].landingPageRightButtonBorderRadius;

      this.changeStyle();
    });
  }


}


