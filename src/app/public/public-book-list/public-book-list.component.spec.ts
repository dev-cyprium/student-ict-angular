import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBookListComponent } from './public-book-list.component';

describe('PublicBookListComponent', () => {
  let component: PublicBookListComponent;
  let fixture: ComponentFixture<PublicBookListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBookListComponent]
    });
    fixture = TestBed.createComponent(PublicBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
