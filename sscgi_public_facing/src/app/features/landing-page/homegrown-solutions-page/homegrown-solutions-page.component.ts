import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScreenSizeService } from '../../../shared/services/screen-size';
import Swiper from 'swiper';


@Component({
  selector: 'sscgi-homegrown-solutions-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    FormsModule,
    CommonModule,

  ],
  templateUrl: './homegrown-solutions-page.component.html',
  styleUrl: './homegrown-solutions-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomegrownSolutionsPageComponent implements AfterViewInit {
  title = "Our Homegrown Solutions";
  subtext = "Our solutions are all about security, simplification and optimisation";

  cardContext = [
    {
      id: 1,
      title: "Acquisition of Resources and Inventory System",
      image: "assets/aris.png",
      subtext: "Our Acquisition of Resources and Inventory System (ARIS) is a full function software that was designed to address the womb-to-tomb government processes..."
    },
    {
      title: "Watchlist Screening and Monitoring Tool",
      image: "assets/i360.png",
      subtext: "Our Integral 360 AML Watchlist Screening & Monitoring Involves mechanisms and systems that allow financial institutions to identify and monitor the financial activies..."
    },
    

    
    
  ];

  swiper: Swiper | undefined;
  screenSize: string = 'desktop';
  isMobile: boolean = false;

  constructor(private screenSizeService: ScreenSizeService) { }

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  initializeSwiper() {
    const slidesPerView = this.isMobile ? 1 : 2;
    const spaceBetween = this.isMobile ? 200 : 0;
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  ngOnInit(): void {
    this.screenSizeService.currentScreenSize.subscribe(size => {
      this.screenSize = size;
      this.isMobile = this.screenSize === 'mobile';
      if (this.swiper) {
        this.swiper.destroy(true, true);
        this.initializeSwiper();
      }
    });
  }

}
