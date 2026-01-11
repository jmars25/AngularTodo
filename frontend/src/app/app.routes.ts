import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { TodoListComponent } from './features/todos/todo-list.component';
import { CreateLoginComponent } from './features/CreateLogin/CreateLogin.componenet';
import {AddTodo} from './features/AddTodos/Add-Todo.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-login', component: CreateLoginComponent },
  {
    path: 'todos',
    component: TodoListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'AddTodo',
    component:AddTodo,


  }
];
