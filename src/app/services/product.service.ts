import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "http://localhost:2027/api/products";

  constructor(private httpClient: HttpClient) { }

  getProductsByCategory(theCategoryId:number): Observable<Product[]>{
    const searchUrl=`${this.apiUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl)
                   .pipe(map(response=> response._embedded.products));

  }

  getProducts(): Observable<Product[]>{

    return this.httpClient.get<GetResponse>(this.apiUrl)
                   .pipe(map(response=> response._embedded.products));

  }
}
interface GetResponse{
    _embedded: {
      products: Product[];
    }
}

