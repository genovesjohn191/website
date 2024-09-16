import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  hidePassword = true;
  hideRePassword = true;
  incorrectAttempts: number = 0; // Track failed attempts
  showCaptcha: boolean = false; // Control CAPTCHA visibility

  ngOnInit(): void {
    localStorage.clear();
  }

  constructor(private authService: AuthService, 
    private snackBar: MatSnackBar, 
    private router: Router,) { }
  togglePasswordVisibility(type: string) {
    if (type === 'new') {
      this.hidePassword = !this.hidePassword;
    } else if (type === 'reEnter') {
      this.hideRePassword = !this.hideRePassword;
    }
  }

  onSubmit(form: any) {
    this.loading = true;
    this.authService.login(form).subscribe({
      next: (data) => {

        if (data[0].token == null) {
          this.showSnackBar(data[0].message);
        } else {
          this.loading = false;
          this.router.navigate(['/tabs/system-setup/section-formatting'])
          localStorage.setItem('token', data[0].token)
          localStorage.setItem('personId',data[0].personId)
          localStorage.setItem('userId',data[0].userId)
          localStorage.setItem('roleId',data[0].roleId)
          console.log(localStorage.getItem("roleId"))
          this.showSnackBar(data[0].message);
        }
      },
      error: (error) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

  }

}
