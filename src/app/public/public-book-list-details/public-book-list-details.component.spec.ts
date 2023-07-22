import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBookListDetailsComponent } from './public-book-list-details.component';

describe('PublicBookListDetailsComponent', () => {
  let component: PublicBookListDetailsComponent;
  let fixture: ComponentFixture<PublicBookListDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBookListDetailsComponent]
    });
    fixture = TestBed.createComponent(PublicBookListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
