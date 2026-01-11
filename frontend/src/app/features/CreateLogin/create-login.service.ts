import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateLoginDto {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateLoginService {
  private apiUrl = 'http://localhost:5000/api/User/CreateLogin '; 

  constructor(private http: HttpClient) {}

  createLogin(username: string, password: string): Observable<CreateLoginDto> {
    const body: CreateLoginDto = {
      username: username,
      password: password
    };

    return this.http.post<CreateLoginDto>(this.apiUrl, body);
  }
}
