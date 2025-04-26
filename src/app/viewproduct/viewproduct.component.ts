import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Productresponse } from '../common/productresponse';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css'],
})
export class ViewproductComponent implements OnInit {
  orderId: number = 0;
  products: Productresponse[] = [];

  constructor(
    private route: ActivatedRoute,
    public dashBoardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const oId = this.route.snapshot.paramMap.get('orderId');
    this.fetchProducts(oId);
  }

  fetchProducts(oId: string | null) {
    if (!oId) {
      console.error('Invalid orderId received');
      return;
    }

    const id = Number(oId);
    if (isNaN(id) || id <= 0) {
      console.error('Invalid orderId:', oId);
      return;
    }

    this.dashBoardService.fetchProductData(id).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  backDashboard() {
    this.router.navigateByUrl('/filterOrders');
  }
}
