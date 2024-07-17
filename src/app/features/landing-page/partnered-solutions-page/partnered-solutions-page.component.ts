import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';


@Component({
  selector: 'sscgi-partnered-solutions-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './partnered-solutions-page.component.html',
  styleUrl: './partnered-solutions-page.component.css'
})
export class PartneredSolutionsPageComponent implements OnInit {
  partners = [
    { name: 'Partner 1', image: 'assets/images/partner1.png' },
    { name: 'Partner 2', image: 'assets/images/partner2.png' },
    { name: 'Partner 3', image: 'assets/images/partner3.png' },
    // Add more partners as needed
  ];

  hoveredSlide: any = null;

  constructor() { }

  ngOnInit(): void {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    swiper.on('slideChange', () => {
      this.hoveredSlide = null;
    });
  }

  onSwiper(event: any): void {
    // Handle swiper events if needed
  }
 
}
