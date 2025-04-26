import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from '../common/dashboard';
import { Observable } from 'rxjs';
import { Orderhistory } from '../common/orderhistory';
import { OrderResponse } from '../common/order-response';
import { Productresponse } from '../common/productresponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashBoardAPIUrl = 'http://localhost:8084/api/admin/dashboard';
  public filterAPIUrl = 'http://localhost:8084/api/admin/filter';
  public productUrl = 'http://localhost:8084/api/admin/orderItems'; // ✅ Fixed URL

  constructor(public httpclient: HttpClient) {}

  public getDashboardDetails(): Observable<Dashboard> {
    return this.httpclient.get<Dashboard>(this.dashBoardAPIUrl);
  }

  public searchForOrders(orderHistory?: Orderhistory): Observable<OrderResponse[]> {
    return this.httpclient.post<OrderResponse[]>(this.filterAPIUrl, orderHistory);
  }

  public fetchProductData(orderId: number): Observable<Productresponse[]> {
    const url = `${this.productUrl}/${orderId}`; // ✅ Corrected to use path parameter
    return this.httpclient.get<Productresponse[]>(url);
  }
}
