import { Component } from '@angular/core';
import { AuthService } from '../login-user/auth-service/auth-service.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
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
