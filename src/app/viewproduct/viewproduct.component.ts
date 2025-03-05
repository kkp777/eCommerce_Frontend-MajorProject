import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Productresponse } from '../common/productresponse';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-viewproduct',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css'
})
export class ViewproductComponent implements OnInit, OnChanges {

  orderId: number = 0;
  old: string = '';
  products: Productresponse[] = [];
  constructor(
    private route: ActivatedRoute,
    public dashBoardService: DashboardService,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.route.params.subscribe((params) => {
    //   this.orderId = params['orderId'];
    //   this.fetchProducts(this.orderId);
    // });   
  }
  ngOnInit(): void {
    this.old = this.route.snapshot.paramMap.get('orderId')!;
    this.fetchProducts(this.old);
    // this.route.params.subscribe((params) => {
    //   this.orderId = params['orderId'];
    //   this.fetchProducts(this.orderId);
    // });
  }
  fetchProducts(old:string){
    const id=Number(old);

    this.dashBoardService
      .fetchProductData(id)
      .subscribe((data:Productresponse[])=>{
        this.products=data;
      });
  }
  backDashboard() {
    this.router.navigateByUrl('/filterOrders');
  }
}
