import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';
  newTodoDescription = '';
  selectedTodo: Todo | null = null;  // Track which todo is selected

  constructor(
    private todoService: TodoService,
    private router: Router,
    private todo: TodoService

  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => this.todos = data,
      error: (err) => console.error('Error fetching todos', err)
    });
  }

// Select a todo when clicked
  selectTodo(todo: Todo): void {
    this.selectedTodo = todo;
  }

  // Delete the selected todo
  deleteSelectedTodo(): void {
    if (!this.selectedTodo) {
      return;
    }

    const id = this.selectedTodo.TodoID;
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.TodoID !== id);
        this.selectedTodo = null;  
      },
      error: (err) => console.error('Error deleting todo', err)
    });
  }


  GoToAddTodo() {
    this.router.navigate(['/AddTodo']);
  }

  get activeTodosCount(): number {
    return this.todos.filter(t => !t.IsCompleted).length;
  }

  get completedTodosCount(): number {
    return this.todos.filter(t => t.IsCompleted).length;
  }
}
