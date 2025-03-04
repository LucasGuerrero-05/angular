import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router'; // Importa Router para navegar
import { ProductService } from '../../services/product-service/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-macbook-category',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './macbook-category.component.html',
  styleUrl: './macbook-category.component.scss'
})

export class MacbookCategoryComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = this.products.filter(product => product.category_id === 2);
    });
  }

  goToProductDetails(productName: string): void {
    const slug = this.productService.toSlug(productName); // Convierte el nombre del producto a slug
    this.router.navigate([`/product-details/${slug}`]); // Navega al detalle del producto usando el slug
  }
}
