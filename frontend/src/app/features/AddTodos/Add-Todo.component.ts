import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddTodoService } from './Add-Todo.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Add-Todo.component.html',
  styleUrls: ['./Add-Todo.component.scss']
})
export class AddTodo {
  userId = 0;
  title = '';
  description = '';
  isCompleted = false;
  dueDate = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private router: Router,
    private addTodoService: AddTodoService,
    private authService: AuthService
  ) {
    
    this.userId = this.authService.getUserId() || 0;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.userId) {
      this.errorMessage = 'UserId is missing. Please log in again.';
      return;
    }

    if (!this.title.trim()) {
      this.errorMessage = 'Title is required.';
      return;
    }

    if (!this.dueDate) {
      this.errorMessage = 'Due date is required.';
      return;
    }

    this.isLoading = true;
    const dueDate = new Date(this.dueDate);

    this.addTodoService
      .AddTodo(this.userId, this.title.trim(), this.description.trim(), dueDate)
      .subscribe({
        next: () => {
          this.successMessage = 'Todo created!';
          this.isLoading = false;
          this.title = '';
          this.description = '';
          this.dueDate = '';
        },
        error: (error) => {
          console.error('Error creating todo:', error);
          this.errorMessage = 'Failed to create todo. Please try again.';
          this.isLoading = false;
        }
      });
  }


 GoToAddTodo() {
    this.router.navigate(['/todos']);
  }



}
