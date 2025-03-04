import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private backendUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}


  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.backendUrl);
  }

  // Obtener un producto por su slug (nombre convertido)
  getProductBySlug(slug: string): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.backendUrl).pipe(
      map((products: Product[]) =>
        products.find((product: Product) =>
          this.toSlug(product.name) === slug
        )
      )
    );
  }

  // Función para convertir el nombre del producto en un slug
  public toSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/<br>/g, ' ')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
}