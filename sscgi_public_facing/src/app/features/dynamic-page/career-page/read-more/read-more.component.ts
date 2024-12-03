import { Component, OnInit } from '@angular/core';
import { SscgiService } from '../../../../sscgi.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    
  ],
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.css'
})
export class ReadMoreComponent implements OnInit {
  careerId: any;
  data: any;
  constructor(private service: SscgiService, private router: Router) { }
  ngOnInit(): void {
    this.careerId = localStorage.getItem("careerId")

    this.getCareerById(this.careerId);
  }



  getCareerById(careerId: any) {
    this.service.getCareerById(careerId).subscribe(data => {
     
      this.data = data[0];
      console.log(this.data)
    })
  }

  apply() {
    localStorage.setItem("jobTitle",this.data.jobTitle)
    console.log(this.data.jobTitle)
    this.router.navigate(['form'])
  }


}
