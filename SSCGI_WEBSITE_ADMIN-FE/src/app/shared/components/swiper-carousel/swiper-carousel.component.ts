import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';

@Component({
  selector: 'app-swiper-carousel',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './swiper-carousel.component.html',
  styleUrl: './swiper-carousel.component.css'
})
export class SwiperCarouselComponent  implements AfterViewInit {
  swiper: Swiper;

  slides = [
    {
      image: 'path/to/image1.jpg',
      title: 'Slide 1 Title',
      description: 'Description for Slide 1'
    },
    {
      image: 'path/to/image2.jpg',
      title: 'Slide 2 Title',
      description: 'Description for Slide 2'
    },
    {
      image: 'path/to/image3.jpg',
      title: 'Slide 3 Title',
      description: 'Description for Slide 3'
    }
  ];

  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
