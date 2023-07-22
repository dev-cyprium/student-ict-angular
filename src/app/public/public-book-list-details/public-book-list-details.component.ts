import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Book } from 'src/app/admin-dashboard/books/book-type';

@Component({
  selector: 'app-public-book-list-details',
  templateUrl: './public-book-list-details.component.html',
  styleUrls: ['./public-book-list-details.component.css'],
})
export class PublicBookListDetailsComponent implements OnInit {
  storage = inject(Storage);
  @Input() book!: Book;

  img = signal<string | null>(null);

  constructor() {}

  ngOnInit(): void {
    if (!this.book.fileMeta) return;
    const r = ref(this.storage, '/' + this.book.fileMeta?.path);
    getDownloadURL(r).then((url) => {
      if (this.img()) return;
      this.img.set(url);
    });
  }
}
