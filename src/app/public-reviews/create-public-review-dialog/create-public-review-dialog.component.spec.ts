import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicReviewDialogComponent } from './create-public-review-dialog.component';

describe('CreatePublicReviewDialogComponent', () => {
  let component: CreatePublicReviewDialogComponent;
  let fixture: ComponentFixture<CreatePublicReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePublicReviewDialogComponent]
    });
    fixture = TestBed.createComponent(CreatePublicReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
