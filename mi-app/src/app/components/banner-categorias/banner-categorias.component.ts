import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-banner-categorias',
  standalone: true,  // Marca el componente como standalone
  templateUrl: './banner-categorias.component.html',
  styleUrls: ['./banner-categorias.component.scss'],
  imports: [
  ]
})
export class BannerCategoriasComponent {
  constructor(private router: Router) {}


goToiphone() {
  this.router.navigate(['/category/iphone']); // Ajusta la ruta según tu configuración
}
}