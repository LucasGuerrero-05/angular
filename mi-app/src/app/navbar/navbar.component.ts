import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login-user/auth-service/auth-service.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { IphoneCategoryComponent } from '../iphone-category/iphone-category.component';
import { MacbookCategoryComponent } from '../macbook-category/macbook-category.component';
import { AirpodsCategoryComponent } from '../airpods-category/airpods-category.component';
import { WatchCategoryComponent } from '../watch-category/watch-category.component';
import { IpadCategoryComponent } from '../ipad-category/ipad-category.component';
import { LoginComponent } from '../login-user/login/login.component';
import { NgIf } from '@angular/common';  // 👈 Importa NgIf

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ProductListComponent, IphoneCategoryComponent, MacbookCategoryComponent, AirpodsCategoryComponent, IpadCategoryComponent, WatchCategoryComponent, LoginComponent, NgIf,],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;  // Variable que indica si el usuario está logueado

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
  

  // Funciones para redirigir
  goToHome() {
    this.router.navigate(['/']);
  }
  
  goTostore() {
    this.router.navigate(['store']);
  }

  goToiphone() {
    this.router.navigate(['iphone']);
  }

  goTomacbook() {
    this.router.navigate(['macbook']);
  }

  goToipad() {
    this.router.navigate(['ipad']);
  }

  goTowatch() {
    this.router.navigate(['watch']);
  }

  goTovision() {
    this.router.navigate(['vision']);
  }

  goToairpods() {
    this.router.navigate(['airpods']);
  }

  goTotvandhome() {
    this.router.navigate(['tvandhome']);
  }

  goToentertainment() {
    this.router.navigate(['entertainment']);
  }

  goToaccesories() {
    this.router.navigate(['accesories']);
  }

  goTosupport() {
    this.router.navigate(['support']);
  }

  // Función para manejar login/logout
  goTologin() {
    if (this.isLoggedIn) {
      this.authService.logout();
    } else {
      this.router.navigate(['login']);
    }
  }
  
  goToProfile(){
    this.router.navigate(['profile']);
  }
  
  

}
