import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-set-password-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './set-password-page.component.html',
  styleUrl: './set-password-page.component.css'
})
export class SetPasswordPageComponent implements OnInit {


  userId: string | null = null;
  passwordForm: FormGroup;
  hidePassword = true;
  hideRePassword = true;
  loading: boolean = false;
  userAccountDetails: any;
  message: string = '';
  showExp: boolean = false;
  showForm: boolean = true;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    // Initialize the form with validation rules
    this.passwordForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            ),
          ],
        ],
        reEnterPassword: ['', Validators.required],
      },
      {
        validator: this.passwordsMatchValidator, // Custom validator to check if passwords match
      }
    );
  }


  ngOnInit() {
    // Extract the userId from query parameters
    this.route.queryParams.subscribe(params => {
      this.userId = params['user'];
      if (this.userId) {
        // Store userId in localStorage
        localStorage.setItem('userId', this.userId);

        // Optionally, redirect to a different page or display a message
        // this.router.navigate(['/some-other-page']);
      }
    });

    this.authService.getEmailExpiry(this.userId).subscribe(
      (data) => {
        console.log(data[0])
        this.userAccountDetails = data[0];
        this.checkTokenStatus();
      },
      (error) => {
        console.error('Error fetching user account details', error);
        this.message = 'Failed to load user account details.';
      }
    );
  }

  checkTokenStatus(): void {
    if (this.userAccountDetails) {
      const currentTime = new Date();
      const tokenExpiry = new Date(this.userAccountDetails.tokenExpiry);

      if (this.userAccountDetails.tokenUsed) {
        this.showExp = true;
        this.showForm = false;
      } else if (currentTime > tokenExpiry) {
        this.showExp = true
        this.showForm = false;
      } else {
        this.showExp = false
      }
    }
  }


  // Custom validator to check if passwords match
  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const reEnterPassword = form.get('reEnterPassword')?.value;
    return newPassword === reEnterPassword || !reEnterPassword
      ? null
      : { passwordsMismatch: true };
  }

  togglePasswordVisibility(type: string) {
    if (type === 'new') {
      this.hidePassword = !this.hidePassword;
    } else if (type === 'reEnter') {
      this.hideRePassword = !this.hideRePassword;
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.passwordForm.valid) {
      const form = {
        "userId": localStorage.getItem("userId"),
        "password": this.passwordForm.value.reEnterPassword
      }
      this.authService.setPassword(form).subscribe({
        next: (data) => {
          console.log(data)
          if (data && data.message) {
            this.showSnackBar(data.message);
            this.loading = false;
            this.router.navigate(['/login'])
          } else if (data == null) {
            this.showSnackBar(data.message);
          }
        },
        error: (error) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      console.log('Form is invalid');
      // Handle form errors, such as showing alerts or error messages
    }
  }


  get passwordsMismatch() {
    return (
      this.passwordForm.hasError('passwordsMismatch') &&
      this.passwordForm.get('reEnterPassword')?.touched
    );
  }


  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

  }

}
