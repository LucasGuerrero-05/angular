import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service/product.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener los productos y filtrar solo los de la categoría 2
    this.productService.getProducts().subscribe((data: Product[]) => {
      // Filtramos los productos de categoría 2
      this.products = data.filter(product => product.category_id === 2);
      console.log(this.products);
    });
  }

  // Función para convertir el nombre del producto en un slug
  private toSlug(name: string): string {
    return name
      .toLowerCase() // Convertir a minúsculas
      .replace(/&/g, 'and') // Reemplazar "&" por "and"
      .replace(/<br>/g, ' ') // Reemplazar "<br>" por un espacio
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/[^a-z0-9-]/g, ''); // Eliminar caracteres especiales
  }

  // Función para navegar al detalle del producto usando el nombre como slug
  goToProductDetails(productName: string): void {
    const slug = this.toSlug(productName); // Convertir el nombre a slug
    this.router.navigate(['/product-details', slug]);
  }

  // Función para el carrusel
  scrollCarousel(direction: number): void {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const itemWidth = (carousel.querySelector('.product-card') as HTMLElement).offsetWidth;
    const scrollAmount = itemWidth;

    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
}
