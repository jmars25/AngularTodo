import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateTodoDto {
  UserID: number;    
  Title: string;
  Description: string;
  DueDate: Date;
  // Note: IsCompleted is NOT sent - backend sets it to false automatically
}

// Response from backend
export interface TodoDto {
  TodoID: number;
  UserID: number;
  Title: string;
  Description: string;
  IsCompleted: boolean;
  DueDate: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class AddTodoService {
  private apiUrl = 'http://localhost:5000/api/Todo/AddTodo'; 

  constructor(private http: HttpClient) {}

  AddTodo(userId: number, title: string, description: string, dueDate: Date): Observable<TodoDto> {
    const body: CreateTodoDto = {
      UserID: userId,           
      Title: title,
      Description: description,
      DueDate: dueDate
      };

    return this.http.post<TodoDto>(this.apiUrl, body);
  }
}
