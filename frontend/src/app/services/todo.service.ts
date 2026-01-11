import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {

    TodoID: number;
    UserId: number;
    Title: string;
    Description: string;
    IsCompleted: boolean;
    CompletedAt: Date;
    DueDate: Date;
}


@Injectable({
  providedIn: 'root'
})
export class TodoService {

    private baseUrl = 'http://localhost:5000/api/todo'

     constructor(private http: HttpClient) {}

     getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }



}