import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL del backend
  private authState = new BehaviorSubject<boolean>(this.hasToken()); 
  // BehaviorSubject que emite si el usuario está logueado o no

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Inicia sesión en el backend y guarda el token + user si es correcto
   */
  login(email: string, contraseña: string) {
    return this.http
      .post<{ token: string; user: any }>(
        `${this.apiUrl}/login`, 
        { email, contraseña }
      )
      .pipe(
        tap(response => {
          this.setUser(response.user, response.token);
        })
      );
  }

  /**
   * Registra un nuevo usuario en el backend
   */
  register(nombre: string, email: string, contraseña: string) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/register`, 
      { nombre, email, contraseña }
    );
  }

  /**
   * Guarda el usuario y el token en localStorage
   * y actualiza el estado de autenticación (authState)
   */
  setUser(user: any, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.authState.next(true);  // Indica que hay sesión activa
  }

  /**
   * Devuelve el usuario almacenado en localStorage
   */
  getUser() {
    // Si no existe, devolvemos un objeto vacío o null
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  /**
   * Devuelve el token almacenado (útil para Interceptores y peticiones con Auth)
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Devuelve el Observable<boolean> para que componentes se suscriban
   */
  isAuthenticated() {
    return this.authState.asObservable();
  }

  /**
   * Retorna un booleano inmediato (sin necesidad de suscribirse)
   */
  isLoggedIn(): boolean {
    return this.authState.value;
  }

  /**
   * Cierra sesión: elimina token y user de localStorage, actualiza estado y navega
   */
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.authState.next(false);
    this.router.navigateByUrl('/login');
  }

  /**
   * Verifica si hay un token en localStorage (usado en el constructor)
   */
  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }
}
