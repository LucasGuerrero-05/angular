// product-description.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  @Input() description: string = ''; // Descripción en HTML
  @Input() styles: string = ''; // Ruta al archivo SCSS
  safeDescription: SafeHtml = ''; // HTML seguro para renderizar

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Sanitiza el HTML para evitar problemas de seguridad
    this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.description);

    // Carga los estilos específicos del producto
    if (this.styles) {
      this.loadStyles(this.styles);
    }
  }

  // Método para cargar estilos dinámicamente
  loadStyles(styleUrl: string) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = styleUrl;
    document.head.appendChild(link);
  }

}