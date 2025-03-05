import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  onSubmit() {
    this.errorMessage = ''; // Limpiar mensaje de error antes de validar

    // Validar que el nombre no esté vacío
    if (this.name.trim() === '') {
      this.errorMessage = 'Por favor, ingresa tu nombre.';
      return;
    }

    // Validar que el email sea válido
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor, ingresa un email válido.';
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    console.log('Datos enviados:', { name: this.name, email: this.email, password: this.password });

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);

        if (err.status === 409) { 
          this.errorMessage = 'Ese usuario ya ha sido registrado.';
        } else {
          this.errorMessage = 'Usuario ya registrado. Por favor, prueba otro correo electrónico.';
        }
      }
    });
  }

  goTologin() {
    this.router.navigate(['/login']);
  }
}
