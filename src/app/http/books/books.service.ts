import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, map } from 'rxjs';
import { Book, FirestoreBook } from 'src/app/admin-dashboard/books/book-type';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  firestore = inject(Firestore);
  storage = inject(Storage);
  bookCollection: CollectionReference;
  books$: Observable<Book[]>;

  constructor() {
    this.bookCollection = collection(this.firestore, 'books');
    const b$ = collectionData(this.bookCollection);

    this.books$ = b$.pipe(
      map((fBooks) =>
        fBooks.map((b) => FirestoreBook.fromDocumentData(b).toBook())
      )
    );
  }

  handleFileUpload(bookID: string, book: Book): void {
    if (!book.fileMeta?.file) {
      throw new Error('No file meta');
    }

    const path = `books/${bookID}/${book.fileMeta.file.name}`;
    const r = ref(this.storage, path);
    const d = doc(this.firestore, 'books', bookID);

    uploadBytesResumable(r, book.fileMeta.file).on(
      'state_changed',
      undefined,
      undefined,
      () => {
        updateDoc(d, { path });
      }
    );
  }

  async createNewBook(book: FirestoreBook): Promise<string> {
    const docRef = await addDoc(this.bookCollection, book.serialize());
    return docRef.id;
  }

  getBooks(): Observable<Book[]> {
    return this.books$;
  }
}
