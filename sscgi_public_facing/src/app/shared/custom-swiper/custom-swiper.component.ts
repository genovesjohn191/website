import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swiper from 'swiper';
import { ScreenSizeService } from '../services/screen-size';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sscgi-custom-swiper',
  standalone: true,
  imports:[
    MatIconModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './custom-swiper.component.html',
  styleUrls: ['./custom-swiper.component.css']
})
export class CustomSwiperComponent implements AfterViewInit  {
  @Input() slides: any[];
  @Input() currentTitle: string;
  @Input() currentSubtext: string;
  swiper: Swiper;

  size :any;
  screenSizeSubscription: Subscription;
  constructor(private screenSizeService: ScreenSizeService) {}

  ngAfterViewInit() {
    this.screenSizeSubscription = this.screenSizeService.currentScreenSize.subscribe(size => {
      this.size = size;
   
    const slidesPerView = size === 'mobile' ? 1 : 5;
    const stretch = size === 'mobile' ? 20 : 60;
    this.swiper = new Swiper('.swiper', {
      effect: 'coverflow',
      grabCursor: true,
      speed: 900,
      slidesPerView: slidesPerView,
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: () => {
          if (this.swiper && this.swiper.realIndex !== undefined) {
            this.currentSubtext = this.slides[this.swiper.realIndex].subtext;
            this.currentTitle = this.slides[this.swiper.realIndex].title;
          }
        },
      },
    });

  });
  }
}
