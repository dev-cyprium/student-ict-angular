import { Component, Input } from '@angular/core';
import { Book } from 'src/app/admin-dashboard/books/book-type';

@Component({
  selector: 'app-public-book-list-details',
  templateUrl: './public-book-list-details.component.html',
  styleUrls: ['./public-book-list-details.component.css'],
})
export class PublicBookListDetailsComponent {
  @Input() book!: Book;
}
