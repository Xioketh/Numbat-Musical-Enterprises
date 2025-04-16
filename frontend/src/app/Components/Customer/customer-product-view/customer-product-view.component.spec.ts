import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductViewComponent } from './customer-product-view.component';

describe('CustomerProductViewComponent', () => {
  let component: CustomerProductViewComponent;
  let fixture: ComponentFixture<CustomerProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProductViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
