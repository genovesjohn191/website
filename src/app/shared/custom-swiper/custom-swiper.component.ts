import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-custom-swiper',
  standalone: true,
  imports:[
    MatIconModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './custom-swiper.component.html',
  styleUrls: ['./custom-swiper.component.css']
})
export class CustomSwiperComponent implements OnInit {
  @Input() cardContext: any[] = [];

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    }
  };

  ngOnInit() {

  }
}
