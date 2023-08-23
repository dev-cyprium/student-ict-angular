import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from 'src/app/admin-dashboard/books/book-type';
import { BooksService } from 'src/app/http/books/books.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreatePublicReviewDialogComponent } from 'src/app/public-reviews/create-public-review-dialog/create-public-review-dialog.component';

@Component({
  selector: 'app-public-book-details-page',
  templateUrl: './public-book-details-page.component.html',
  styleUrls: ['./public-book-details-page.component.css'],
})
export class PublicBookDetailsPageComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  book?: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  handleCreateReview(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.snackBar.open(
        'Morate biti prijavljeni da biste ostavili recenziju',
        '',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      this.router.navigate(['/login']);
      return;
    }

    this.dialog.open(CreatePublicReviewDialogComponent, {
      width: '500px',
    });
  }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(switchMap((params) => this.bookService.getBook(params['id'])))
      .subscribe((book) => (this.book = book));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
