import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/todos']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Login failed';
      }
    });
  }

  goToCreateLogin() {
    this.router.navigate(['/create-login']);
  }
}
