import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.page.html',
  styleUrls: ['./market-detail.page.scss'],
  standalone: false,
})
export class MarketDetailPage {
  categories: any[] = [];
  imageBaseUrl = 'https://im-staging.haat.delivery/';
  apiBaseUrl = 'https://user-new-app-staging.internal.haat.delivery/api/markets/4532/categories/';
  categoryId: number | undefined;
  selectedCategory: any;
  
  @ViewChild('categoryContainer') categoryContainer!: ElementRef;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  // ======================== page enter id get ============================================

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id')); 
    console.log("Market Page Loaded. Category ID:", this.categoryId);
    
    this.fetchCategories();
  }

  // ==================================== second api call =============================================

  fetchCategories() {
    if (!this.categoryId) return; 

    this.http.get(`${this.apiBaseUrl}${this.categoryId}`).subscribe((response: any) => {
      console.log("API Response:", response); 

      if (response && response.marketSubcategories) {
        this.categories = response.marketSubcategories.map((sub: any) => ({
          id: sub.id,
          name: sub.name, 
          products: sub.products || [], 
        }));
      } else {
        this.categories = [];
      }

      console.log("Mapped Categories:", this.categories);

      if (this.categories.length > 0) {
        this.selectCategory(this.categories[0]);
      }
    });
  }
  
  // ================================================= selected category get funcation  ===================================================


  selectCategory(category: any) {
    this.selectedCategory = category;
    console.log("Selected Category Products:", category.products);
  }

  // ================================================= scroll bat funcation ===================================================

  scrollToCategory(categoryId: number) {
    this.selectedCategory = this.categories.find(cat => cat.id === categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ================================================= image get funcation ===================================================

  getItemImage(product: any): string {
    if (product && product.productImages && product.productImages.length > 0) {
      return this.imageBaseUrl + product.productImages[0].serverImageUrl;
    }
    return 'assets/default-image.jpg';
  }
}
