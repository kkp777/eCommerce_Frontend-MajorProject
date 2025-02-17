import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { ProductCategoryService } from '../services/product-category.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
    product!: Product;
    
    constructor(
      private productService:ProductService,
      private route:ActivatedRoute,
      private cartService:ProductCategoryService
    ){}

    ngOnInit():void{
      this.route.paramMap.subscribe(()=>{
        this.handleProductDetails();
      });
    }

    handleProductDetails(){
      //get id param value and call service method
      const theProductId:number=+this.route.snapshot.paramMap.get('id')!;
      this.productService.getProduct(theProductId).subscribe((data)=>{
        this.product=data;
      })
    }
}
