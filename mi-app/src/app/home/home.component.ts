import { Component } from '@angular/core';
import { BannerPrincipalComponent } from '../banner-principal/banner-principal.component';
import { BannerCategoriasComponent } from '../banner-categorias/banner-categorias.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsComponent } from '../products/products.component'; // Ajusta la ruta si es necesario
import { Routes } from '@angular/router'; // Importa 'Routes' aquí

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerPrincipalComponent, BannerCategoriasComponent, ProductListComponent, ProductsComponent,], // Aquí importas los componentes
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Lógica del componente
}

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta por defecto, carga HomeComponent
  // otras rutas aquí
];