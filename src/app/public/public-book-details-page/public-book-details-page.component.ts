import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from 'src/app/admin-dashboard/books/book-type';
import { BooksService } from 'src/app/http/books/books.service';

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
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(switchMap((params) => this.bookService.getBook(params['id'])))
      .subscribe((book) => (this.book = book));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
