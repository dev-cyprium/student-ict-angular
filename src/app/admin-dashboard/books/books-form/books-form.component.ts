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
  book: Book = new Book('', '', 0, 0, '');
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
    const bookID = await this.bookService.createNewBook(this.book);
    this.bookService.handleFileUpload(bookID, this.book);
    this.router.navigate(['/admin/books']);
  }
}
