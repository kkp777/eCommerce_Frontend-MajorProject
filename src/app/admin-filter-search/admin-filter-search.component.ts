import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewproductComponent } from '../viewproduct/viewproduct.component';
import { Router, RouterModule } from '@angular/router';
import { OrderResponse } from '../common/order-response';
import { Orderhistory } from '../common/orderhistory';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-admin-filter-search',
  imports: [FormsModule, CommonModule, ViewproductComponent, RouterModule],
  templateUrl: './admin-filter-search.component.html',
  styleUrl: './admin-filter-search.component.css'
})
export class AdminFilterSearchComponent implements OnInit {
    
    orderHistory:Orderhistory=new Orderhistory();
    orders:OrderResponse[]=[];
    sendOrderId:number=0;
    constructor(
      public dashBoardService: DashboardService,
      private router: Router
    ) {}
    ngOnInit(): void {
      this.filterOrders();
    }

    // filterOrders(){
    //   this.dashBoardService
    //     .searchForOrders(this.orderHistory)
    //     .subscribe((data:OrderResponse[])=>{
    //       this.orders=data;
    //     });
    //     console.log(this.orders);
    // }

    filterOrders() {
      this.dashBoardService.searchForOrders(this.orderHistory).subscribe(
        (data: OrderResponse[]) => {
          console.log('API Response:', data);  // Debugging Step
          this.orders = data;
        },
        (error) => {
          console.error('API Error:', error); // Debugging Step
        }
      );
    }
    
    
    getProduct(orderId: number) {
      this.router.navigateByUrl(`/viewProduct/${orderId}`);
    }
}
