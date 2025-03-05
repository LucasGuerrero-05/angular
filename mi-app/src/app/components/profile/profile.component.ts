import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [CommonModule],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any;
  role: string = '';

  constructor(private authService: AuthService) {
    // Obtener el usuario del servicio de autenticación
    this.user = this.authService.getUser();
    this.role = this.user ? this.user.rol : '';  // Asumiendo que el rol está en el objeto user
  }
}
