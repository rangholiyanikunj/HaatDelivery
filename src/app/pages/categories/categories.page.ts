import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit {
  categories: any[] = [];
  apiUrl = 'https://user-new-app-staging.internal.haat.delivery/api/markets/4532';

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        console.log('API Response:', response);
        if (response && response.marketCategories) {
          this.categories = response.marketCategories.map((category: any) => {  
            const imageUrl = 'https://im-staging.haat.delivery/' + category.serverImageUrl;
            console.log('Image URL:', imageUrl);
            return {
              ...category,
              fullImageUrl: imageUrl
            };
          });
        } else {
          console.error('No categories found in response');
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  
  
  
  

  openCategory(category: any) {
    console.log('Category Clicked:', category.id);
    this.navCtrl.navigateForward(`/market-detail/${category.id}`);
  }
}
