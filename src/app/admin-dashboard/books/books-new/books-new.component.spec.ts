import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksNewComponent } from './books-new.component';
import { firebaseImports, mockFirebaseProviders } from 'src/test/mock';
import { LayoutComponent } from '../../layout/layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksFormComponent } from '../books-form/books-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe('BooksNewComponent', () => {
  let component: BooksNewComponent;
  let fixture: ComponentFixture<BooksNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksNewComponent, LayoutComponent, BooksFormComponent],
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
        ...firebaseImports,
      ],
      providers: mockFirebaseProviders,
    });
    fixture = TestBed.createComponent(BooksNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
