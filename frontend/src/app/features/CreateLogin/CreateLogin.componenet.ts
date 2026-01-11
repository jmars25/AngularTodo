import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateLoginService } from './create-login.service';

@Component({
  selector: 'app-CreateLogin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './CreateLogin.component.html',
  styleUrls: ['./CreateLogin.component.scss']
})
export class CreateLoginComponent {
  username = '';
  password = '';
  retypePassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private router: Router,
    private createLoginService: CreateLoginService
  ) {}

  onSubmit() {
   
    this.errorMessage = '';
    this.successMessage = '';

    // Validate passwords match
    if (this.password !== this.retypePassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

   
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Username and password are required!';
      return;
    }

   
    this.isLoading = true;

    
    this.createLoginService.createLogin(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('Account created successfully:', response);
          this.successMessage = 'Account created! Redirecting to login...';
          this.isLoading = false;

          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error creating account:', error);
          this.isLoading = false;

         
          if (error.error?.error) {
            this.errorMessage = error.error.error;
          } else if (error.status === 400) {
            this.errorMessage = 'Invalid input. Please check your information.';
          } else {
            this.errorMessage = 'Failed to create account. Please try again.';
          }
        }
      });
  }

  GoToLogin() {
    this.router.navigate(['/login']);
  }
}