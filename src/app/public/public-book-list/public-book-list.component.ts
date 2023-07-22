import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Book } from 'src/app/admin-dashboard/books/book-type';
import { BooksService } from 'src/app/http/books/books.service';

@Component({
  selector: 'app-public-book-list',
  templateUrl: './public-book-list.component.html',
  styleUrls: ['./public-book-list.component.css'],
})
export class PublicBookListComponent implements OnDestroy {
  books: Book[] = [];
  subscription!: Subscription;

  searchBook: string = '';
  onSearchBookChange: Subject<string> = new Subject<string>();
  searchSubscription: Subscription;

  constructor(private booksService: BooksService) {
    this.initializeBooks();

    this.searchSubscription = this.onSearchBookChange
      .pipe(
        debounceTime(350),
        switchMap((searchTerm) => this.booksService.getBooks(searchTerm))
      )
      .subscribe((books) => {
        this.books = books;
      });
  }

  initializeBooks() {
    this.subscription = this.booksService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
}
