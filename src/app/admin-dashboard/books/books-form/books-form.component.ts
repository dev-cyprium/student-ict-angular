import { Component, ElementRef, ViewChild } from '@angular/core';
import { Book } from '../book-type';
import { BooksService } from 'src/app/http/books/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css'],
})
export class BooksFormComponent {
  book: Book = new Book('Moja knjiga', 'Ja', 2021, 100, 'Drama', 'a-12344');
  submited = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private bookService: BooksService, private router: Router) {}

  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files?.[0];
    if (file) {
      this.book.fileMeta = { file, path: null };
    }
  }

  async onSubmit(): Promise<void> {
    this.submited = true;
    // TODO: reference is lost here so we have to keep bookID
    // refactor it to keep reference to book, and refactor out
    // the 2 separate book classes in a more inteligent way
    const bookID = await this.bookService.createNewBook(
      this.book.toFirestoreBook()
    );
    this.bookService.handleFileUpload(bookID, this.book);
    this.router.navigate(['/admin/books']);
  }
}
