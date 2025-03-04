import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL del backend
  private authState = new BehaviorSubject<boolean>(this.hasToken()); // Estado de autenticación

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión
  login(email: string, contraseña: string) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, { email, contraseña })
      .pipe(tap(response => {
        this.setUser(response.user, response.token);  // Guarda el usuario y el token
      }));
  }

  // Método para registrar un usuario
  register(nombre: string, email: string, contraseña: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, { nombre, email, contraseña });
  }

  // Guardar el usuario y el token en LocalStorage y emitir el cambio
  setUser(user: any, token: string) {
    localStorage.setItem('user', JSON.stringify(user));  // Guarda el usuario
    localStorage.setItem('token', token);  // Guarda el token
    this.authState.next(true);  // Emitir que el usuario ha iniciado sesión
  }

  // Obtener el usuario autenticado
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Saber si el usuario está logueado
  isAuthenticated() {
    return this.authState.asObservable();
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');  // Eliminar también el token
    this.authState.next(false);  // Emitir que el usuario cerró sesión
    this.router.navigateByUrl('/login');
  }

  // Verificar si hay un token almacenado
  private hasToken(): boolean {
    const token = localStorage.getItem('token');  // Verificar si existe el token en localStorage
    return token !== null;  // Si el token existe, el usuario está autenticado
  }
}
