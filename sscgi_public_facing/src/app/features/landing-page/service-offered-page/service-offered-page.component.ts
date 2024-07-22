import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'sscgi-service-offered-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-offered-page.component.html',
  styleUrl: './service-offered-page.component.css'
})
export class ServiceOfferedPageComponent {

  services = [
    {
      icon: 'assets/carousel1-icon/SYSTEMDEVELOPMENT.png',
      title: 'System Development',
      description: 'Our experienced developers are specialized in building custom applications...',
      link: '#'
    },
    {
      icon: 'assets/carousel1-icon/DOCUMENTCONVERSION.png',
      title: 'Document Conversion',
      description: 'Our document conversion services team streamline the process...',
      link: '#'
    },
    {
      icon: 'assets/carousel1-icon/STAFFAUGMENTATION.png',
      title: 'Staff Augmentation',
      description: 'We provide staff for IT support, engineers, architects...',
      link: '#'
    },
    {
      icon: 'assets/carousel1-icon/PROJECTMANAGEMENT.png',
      title: 'Project Management',
      description: 'We bring specialized knowledge and skills to the project management...',
      link: '#'
    },
    {
      icon: 'assets/carousel1-icon/PROJECTMANAGEMENT.png',
      title: 'Project Management',
      description: 'We bring specialized knowledge and skills to the project management...',
      link: '#'
    },
    
    {
      icon: 'assets/carousel1-icon/PROJECTMANAGEMENT.png',
      title: 'Project Management',
      description: 'We bring specialized knowledge and skills to the project management...',
      link: '#'
    },
    
    {
      icon: 'assets/carousel1-icon/PROJECTMANAGEMENT.png',
      title: 'Project Management',
      description: 'We bring specialized knowledge and skills to the project management...',
      link: '#'
    },
    
    

  ];

  swiper: any;
  currentTitle: string = this.services[0].title;
  currentSubtext: string = this.services[0].description;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper('.mySwiper2', {
      grabCursor: true,
      speed: 900,
      slidesPerView: 5,
      spaceBetween: 50,
      loop: true,
      slideToClickedSlide: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        slideChange: () => {
          if (this.swiper && this.swiper.realIndex !== undefined) {
            this.currentTitle = this.services[this.swiper.realIndex].title;
            this.currentSubtext = this.services[this.swiper.realIndex].description;
          }
        },
      },
    });
  }
}
