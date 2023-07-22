import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBookDetailsPageComponent } from './public-book-details-page.component';

describe('PublicBookDetailsPageComponent', () => {
  let component: PublicBookDetailsPageComponent;
  let fixture: ComponentFixture<PublicBookDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBookDetailsPageComponent]
    });
    fixture = TestBed.createComponent(PublicBookDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
