import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketDetailPage } from './market-detail.page';

describe('MarketDetailPage', () => {
  let component: MarketDetailPage;
  let fixture: ComponentFixture<MarketDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
