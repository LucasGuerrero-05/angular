import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Rutas definidas
export const routes: Routes = [
  { path: '', component: HomeComponent },
  // Más rutas pueden ser agregadas aquí
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterModule, // Debes importar RouterModule aquí para que funcione el routing
  ],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>  <!-- Aquí se carga HomeComponent -->
    <app-footer></app-footer>
  `,
})
export class AppComponent {}
