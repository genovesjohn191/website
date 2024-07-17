import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'sscgi-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footerlogo = "assets/footer-logo.png"

  footerText = [
    {
      title:"Location",
      subtext:"Unit 214–218 Buma Building, 1012 Metropolitan Avenue ",
      subtext1:"San Antonio Village, Makati City, Philippines 1203",
      subtext2:"(+63) 999 999 9999"
    },
    {
      title:"Home",
      link1:"News",
      link2:"Insights",
      link3:"Contact Us",
      link4:"Careers"
    }
  ]
}
