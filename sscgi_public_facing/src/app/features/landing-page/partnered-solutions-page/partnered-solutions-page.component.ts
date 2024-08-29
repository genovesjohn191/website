import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { CustomSwiperComponent } from '../../../shared/custom-swiper/custom-swiper.component';


@Component({
  selector: 'sscgi-partnered-solutions-page',
  standalone: true,
  imports: [
    CommonModule,
    CustomSwiperComponent
  ],
  templateUrl: './partnered-solutions-page.component.html',
  styleUrl: './partnered-solutions-page.component.css'
})
export class PartneredSolutionsPageComponent{
  title = "Our Partnered Solutions";
  subText = "We have established strategic partnerships with industry-leading organizations to complement our expertise and deliver comprehensive solutions to our clients.";
  slides = [
    { image: 'assets/carousel-icon/onbase.png', title: 'Enterprise Content Management Software', subtext: 'Onbase Enterprise Content Management software puts your content into context, so you can use it to make smarter and faster business decisions. Our system empowers your organization to become more agile....Learn more...' },
    { image: 'assets/carousel-icon/adrenalinmax.png', title: 'Human Resources Information System', subtext: 'Adrenalin MAX HCM suite is a Contextual, Contemporary, and Composable application that digitizes employee lifecycle processes. Our end-to-end robust applications for each process in the employee lifecycle are designed to ensure that you hire the right talent for the job and offer the best employee experience. Leverage our solutions to deliver measurable ROI.' },
    { image: 'assets/carousel-icon/allcloud.png', title: 'Loans Origination, Management and Collection Software', subtext: 'Our AllCloud unified lending technology software was built to hyper-scale and provides secure and highly configurable application that adds more power to your lending operations. Loan Origination, Management, and Collections are made extremely efficient which empowers seamless flow of lending operations to ensure exceptional user experiences and team confidence.' },
    { image: 'assets/carousel-icon/aml.png', title: 'Anti-Money Laundering Software', subtext: 'Our AML software is a robust solution built on latest technology with service-oriented architecture. It is a web-based solution with an enterprise-wide approach that analyses both the client profiles and all of their transactions using rules-based scenarios, patterns and monetary thresholds. Our system is built on J2EE architecture, thus, help financial companies achieve greater convenience and ease of use with a faster roll-out with minimal infrastructure investment.' },
    { image: 'assets/carousel-icon/crm.png', title: 'Customer Relationship Management System', subtext: 'The Flodock CRM software will keep track of interactions, data, and notes about customers or potential. The data is stored in a central database and is accessible to multiple people within an organization. The solution aims to helps streamline sales, marketing efforts, customer service, accounting, and management for growing companies. Multiple people can access and edit the information about a particular client’s customer journey.' },
    { image: 'assets/carousel-icon/signinghub.png', title: 'Digital Signing Software', subtext: 'SigningHub by Ascertia is a complete solution for document approval workflows, digital and electronic signatures & document tracking. SigningHub’s security engine is certified as a trustworthy system under EU standards (CWA 14167-1) and has become the first in the world to pass the stringent Common Criteria EAL4+ certification process (EN 419 241-2 Protection Profile). It is also certified as part of the US Government FIPS 201 and FPKI Path Discovery and Validation (PD-VAL) programs.' },
  ];
  
  currentTitle: string = this.slides[0].title;
  currentSubtext: string = this.slides[0].subtext;
  
  
}
