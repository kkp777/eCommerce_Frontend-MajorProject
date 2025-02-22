import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LogindetailsComponent } from './logindetails/logindetails.component';

export const routes: Routes = [
    { path: 'checkout', component: CheckoutComponent },
    { path: 'login-details', component: LogindetailsComponent },

    { path: 'cart', component: CartComponent },
   { path: 'search/:keyword', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
   
   {path:'categories', component:ProductCategoryComponent},
    { path: 'category/:id', component: ProductListComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' },
  //  { path: 'product-category', component: ProductCategoryComponent },
];
