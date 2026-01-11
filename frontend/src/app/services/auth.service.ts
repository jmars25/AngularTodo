import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface JwtPayload {
  sub: string;        
  userId: string;     
  jti: string;        
  exp: number;        
  iss: string;        
  aud: string;        
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const body: LoginRequest = { username, password };

    return this.http.post<LoginResponse>(`${this.baseUrl}/api/user/login`, body)
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Decode the JWT token and return the payload
  private getDecodedToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Get the userId from the JWT token
  getUserId(): number | null {
    const decoded = this.getDecodedToken();
    return decoded?.userId ? Number(decoded.userId) : null;
  }

  // Get the username from the JWT token
  getUsername(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.sub || null;
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) {
      return true;
    }

    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
  }
}
