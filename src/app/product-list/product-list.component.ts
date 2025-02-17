import { Component, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  currentCategoryId:number=1;
  searchMode: boolean = false;

  constructor(private productService:ProductService,
    private route:ActivatedRoute ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
    
  }
  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handlelistProducts();
    }
  }

  handleSearchProducts(){
      const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;
      this.productService.searchProducts(theKeyword).subscribe((data)=>{
        this.products=data;
      });
  }
  
  handlelistProducts(){
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has("id");
    if(hasCategoryId){
      //get category id and convert it into num type
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId=1;
    }
    this.productService.getProductsByCategory(this.currentCategoryId).subscribe(data=>{
      this.products=data;
    })
  }

}
