import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReviewsComponent } from './public-reviews.component';

describe('PublicReviewsComponent', () => {
  let component: PublicReviewsComponent;
  let fixture: ComponentFixture<PublicReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicReviewsComponent]
    });
    fixture = TestBed.createComponent(PublicReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
