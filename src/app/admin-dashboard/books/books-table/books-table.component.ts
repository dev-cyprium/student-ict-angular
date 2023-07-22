import { Component, OnDestroy } from '@angular/core';
import { BooksService } from 'src/app/http/books/books.service';
import { Book } from '../book-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css'],
})
export class BooksTableComponent implements OnDestroy {
  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'year', 'actions'];
  subscription: Subscription;

  constructor(private booksService: BooksService) {
    this.subscription = this.booksService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  deleteBook(_id: string): void {
    // this.booksService.deleteBook(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
