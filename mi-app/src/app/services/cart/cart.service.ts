import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    const carrito: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const initialCount = Math.max(0, carrito.length - 1);

    this.cartCountSubject.next(initialCount);
  }

  addProductToCart(product: Product) {
    let carrito: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(carrito)
    if (!product) return

    if (carrito.length > 0) {
      carrito.push(product)
    } else {
      carrito = [product];
    }

    localStorage.setItem('cart', JSON.stringify(carrito));

    const currentCount = this.cartCountSubject.value;
    this.cartCountSubject.next(currentCount + 1);
  }

  removeProductFromCart(product: Product) {
    let carrito: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (!product) return

    if (carrito.length > 0) {
      carrito = carrito.filter((item) => item.id !== product.id)
      localStorage.setItem('cart', JSON.stringify(carrito));
    }

    const currentCount = this.cartCountSubject.value;
    this.cartCountSubject.next(Math.max(0, currentCount - 1));
  }

  setCartCount(count: number) {
    this.cartCountSubject.next(count);
  }
}
