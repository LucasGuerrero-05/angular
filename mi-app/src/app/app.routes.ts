import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { IphoneCategoryComponent } from './iphone-category/iphone-category.component';
import { MacbookCategoryComponent } from './macbook-category/macbook-category.component';
import { AirpodsCategoryComponent } from './airpods-category/airpods-category.component';
import { WatchCategoryComponent } from './watch-category/watch-category.component';
import { IpadCategoryComponent } from './ipad-category/ipad-category.component';
import { LoginComponent } from './login-user/login/login.component';
import { RegisterComponent } from './login-user/register/register.component';
import { ProfileComponent } from './profile/profile.component';

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
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
];
