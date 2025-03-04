import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product-service/product.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { CartService } from '../services/cart/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [CommonModule, NgIf] // Agrega el componente aquí
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined; // Aquí se almacena el producto

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug'); // Obtener el slug de la URL
      if (slug) {
        this.productService.getProductBySlug(slug).subscribe(product => {
          this.product = product;
        });
      }
    });
  }

  addToCart() {
    debugger
    console.log('Product added to cart');
    this.cartService.addProductToCart(this.product!);
  }
}