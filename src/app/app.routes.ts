import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

export const routes: Routes = [
    //{ path: 'cart', component: CartComponent },
  //  { path: 'search/:keyword', component: ProductListComponent },
   // { path: 'products/:id', component: ProductDetailsComponent },
   
   {path:'categories', component:ProductCategoryComponent},
    { path: 'category/:id', component: ProductListComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' },
  //  { path: 'product-category', component: ProductCategoryComponent },
];
