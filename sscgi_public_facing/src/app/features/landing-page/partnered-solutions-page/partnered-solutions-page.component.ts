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
export class PartneredSolutionsPageComponent implements AfterViewInit {

  slides = [
    { image: 'assets/carousel-icon/onbase.png', title: 'Title 1', subtext: 'Subtext 1' },
    { image: 'assets/carousel-icon/adrenalinmax.png', title: 'Title 2', subtext: 'Subtext 2' },
    { image: 'assets/carousel-icon/allcloud.png', title: 'Title 3', subtext: 'Subtext 3' },
    { image: 'assets/carousel-icon/aml.png', title: 'Title 4', subtext: 'Subtext 4' },
    { image: 'assets/carousel-icon/crm.png', title: 'Title 5', subtext: 'Subtext 5' },
    { image: 'assets/carousel-icon/signinghub.png', title: 'Title 6', subtext: 'Subtext 6' },
  ];
  
  ngAfterViewInit(): void {
    const swiper = new Swiper('.mySwiper', {
      effect:"coverflow",
      grabCursor:true,
      speed:600,
      slidesPerView: 5,
      spaceBetween: 0,
      centeredSlides: true,
      loop:true,
      coverflowEffect:{
        rotate:0,
        stretch:20,
        depth:300,
        modifier:1,
        slideShadows:true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: function () {
        
          const slides = document.querySelectorAll('.swiper-slide');
          slides.forEach((slide, index) => {
            if (index === this.activeIndex) {
              slide.classList.add('swiper-slide-active');
              slide.classList.remove('swiper-slide-prev', 'swiper-slide-next');
            } else if (index === this.activeIndex - 1 || index === this.activeIndex + 1) {
              slide.classList.remove('swiper-slide-active');
              slide.classList.add('swiper-slide-prev', 'swiper-slide-next');
            } else {
              slide.classList.remove('swiper-slide-active', 'swiper-slide-prev', 'swiper-slide-next');
            }
          });
        }
      },

    });
  }
}
