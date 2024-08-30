import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-password-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './set-password-page.component.html',
  styleUrl: './set-password-page.component.css'
})
export class SetPasswordPageComponent {

  onSubmit(): void {
    
  }
}
