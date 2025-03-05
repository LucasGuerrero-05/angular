import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AirpodsCategoryComponent } from './components/airpods-category/airpods-category.component';
import { HomeComponent } from './components/home/home.component';
import { IpadCategoryComponent } from './components/ipad-category/ipad-category.component';
import { IphoneCategoryComponent } from './components/iphone-category/iphone-category.component';
import { LoginComponent } from './components/login-user/login/login.component';
import { RegisterComponent } from './components/login-user/register/register.component';
import { MacbookCategoryComponent } from './components/macbook-category/macbook-category.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { WatchCategoryComponent } from './components/watch-category/watch-category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta por defecto, carga HomeComponent
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-details/:slug', component: ProductDetailsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'store', component: ProductListComponent }, // Ruta para la página de productos
  { path: 'iphone', component: IphoneCategoryComponent}, // Ruta para la página de productos
  { path: 'macbook', component: MacbookCategoryComponent}, // Ruta para la página de productos
  { path: 'ipad', component: IpadCategoryComponent}, // Ruta para la página de productos
  { path: 'watch', component: WatchCategoryComponent}, // Ruta para la página de productos
  { path: 'airpods', component: AirpodsCategoryComponent}, // Ruta para la página de productos
  { path: 'login', component: LoginComponent}, // Ruta para la página de productos
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
];
