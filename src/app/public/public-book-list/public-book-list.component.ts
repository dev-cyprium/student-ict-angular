import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/admin-dashboard/books/book-type';
import { BooksService } from 'src/app/http/books/books.service';

@Component({
  selector: 'app-public-book-list',
  templateUrl: './public-book-list.component.html',
  styleUrls: ['./public-book-list.component.css'],
})
export class PublicBookListComponent implements OnDestroy {
  books: Book[] = [];
  subscription: Subscription;

  constructor(private booksService: BooksService) {
    this.subscription = this.booksService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
