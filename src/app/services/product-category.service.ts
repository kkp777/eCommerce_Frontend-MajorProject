import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';



@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private rootUrl:string="http://localhost:2027/api/product-category";
  constructor(private httpClient:HttpClient) { 
    
  }
  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.rootUrl)
                   .pipe(map(response=> response._embedded.productCategories));
  }
}

//interface for mapping the response
interface GetResponseProductCategory{
  _embedded: {
    productCategories:ProductCategory[];
  };
}
