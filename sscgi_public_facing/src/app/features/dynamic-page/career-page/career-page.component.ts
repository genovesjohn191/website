import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this line
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SscgiService } from '../../../sscgi.service';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-career-page',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatIconModule

  ],
  templateUrl: './career-page.component.html',
  styleUrl: './career-page.component.css'
})
export class CareerPageComponent implements OnInit {
  safeImageUrl: SafeUrl;
  searchQuery: string = '';
  selectedCategory: string = '';
  categories: string[] = ['Engineering', 'Marketing', 'Sales', 'Design', 'Support'];
  jobs: any[] = [];
  allJobs: any[] = [];
  ngOnInit(): void {
    this.getCarrerList();
  }

  constructor(private service: SscgiService, private router: Router) {

  }



  searchJobs() {
    const query = this.searchQuery.toLowerCase().trim();
    if (query) {
      // If there's a query, show jobs that match
      this.jobs = this.allJobs.filter(job =>
        job.jobTitle.toLowerCase().includes(query) ||
        job.shortDescription.toLowerCase().includes(query)
      );
    } else {
      // If no query, reset to all jobs
      this.jobs = [...this.allJobs];
    }
  }

  getCarrerList() {
    this.service.getCareer().subscribe(data => {
      console.log(data)
      this.jobs = data;
      this.allJobs = data;
    })
  }

  viewJobDetails(job: any): void {
    // Open a dialog and pass the job data to the JobDetailsComponent
    console.log(job.careerID)
    localStorage.setItem("careerId", job.careerID)
    this.router.navigate(['careers-readmore'])
  }
}

