import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReviewSummaryComponent } from './book-review-summary.component';

describe('BookReviewSummaryComponent', () => {
  let component: BookReviewSummaryComponent;
  let fixture: ComponentFixture<BookReviewSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookReviewSummaryComponent]
    });
    fixture = TestBed.createComponent(BookReviewSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
