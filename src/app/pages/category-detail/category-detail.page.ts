import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
  standalone: false,
})
export class CategoryDetailPage implements OnInit {
  categoryId: number | undefined;
  category: any;
  marketDetails: any;
  apiUrl = 'https://user-new-app-staging.internal.haat.delivery/api/markets/4532';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.getMarketDetails();
  }

  getMarketDetails() {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        console.log('Market Details:', response);
        this.marketDetails = response;
        this.highlightCategory();
      },
      (error) => {
        console.error('Error fetching market details:', error);
      }
    );
  }

  highlightCategory() {
    if (this.marketDetails && Array.isArray(this.marketDetails.categories)) {
      this.category = this.marketDetails.categories.find((c: any) => Number(c.id) === this.categoryId);

      if (!this.category) {
        console.error(`Category ID ${this.categoryId} not found in market data`);
      }
    } else {
      console.error('Error: categories not found or not an array in marketDetails');
    }
  }
}
