import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service/product.service';
import { Router } from '@angular/router'; // Importa Router para navegar
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common'; // Importar CommonModule
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        // Replicamos los productos para llenar el grid
        this.products = [...products,]; // 5 veces los 7 productos
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  // Método para navegar a los detalles del producto
  goToProductDetails(productName: string): void {
    const slug = this.productService.toSlug(productName); // Convierte el nombre del producto a slug
    this.router.navigate([`/product-details/${slug}`]); // Navega al detalle del producto usando el slug
  }

}


