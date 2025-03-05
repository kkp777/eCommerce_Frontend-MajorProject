import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderResponse } from '../common/order-response';
import { Orderhistory } from '../common/orderhistory';
import { Dashboard } from '../common/dashboard';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-admindashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent implements OnInit {
  dashBoard:Dashboard;
  orderHistory:Orderhistory=new Orderhistory();
  orders:OrderResponse[]=[];

  constructor(public dashBoardService: DashboardService){
    this.dashBoard={
      customersCount:0,
      ordersCount:0,
      amountCollected:0,
      productCount:0,
    };
  }
  ngOnInit(): void {
    this.getDashBoardData();
    this.filterOrders();
  }

  getDashBoardData(){
    this.dashBoardService.getDashboardDetails().subscribe((data)=>{
      this.dashBoard=data;
    });
    console.log(this.dashBoard);
  }

  filterOrders(){
    this.dashBoardService
      .searchForOrders(this.orderHistory)
      .subscribe((data:OrderResponse[])=>{
        this.orders=data;
      });
  }

}
