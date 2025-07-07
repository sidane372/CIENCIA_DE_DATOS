import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiURL = 'http://127.0.0.1:8000/api';

    constructor(private http: HttpClient, private router: Router) { }

    login(identifier: string, password: string) {
        return this.http.post<any>(`${this.apiURL}/login/`, {
            identifier,
            password
        });
    }

    saveToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    //Método para registrar un nuevo usuario
    //Recibe username, email y password

    register(username: string, email: string, password: string) {
        return this.http.post(`${this.apiURL}/register/`, {
            username,
            email,
            password
        });
    }
}