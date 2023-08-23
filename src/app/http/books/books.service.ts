import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  limit,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, map, shareReplay } from 'rxjs';
import { Book } from 'src/app/admin-dashboard/books/book-type';

const COLLECTION_PATH = 'books';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  firestore = inject(Firestore);
  storage = inject(Storage);
  private cachedBooks: CollectionReference<DocumentData> | null = null;

  handleFileUpload(bookID: string, book: Book): void {
    if (!book.fileMeta?.file) {
      throw new Error('No file meta');
    }

    const path = `books/${bookID}/${book.fileMeta.file.name}`;
    const r = ref(this.storage, path);
    const d = doc(this.firestore, COLLECTION_PATH, bookID);

    uploadBytesResumable(r, book.fileMeta.file).on(
      'state_changed',
      undefined,
      undefined,
      () => {
        updateDoc(d, { path });
      }
    );
  }

  async createNewBook(book: Book): Promise<string> {
    const bookCollection = collection(this.firestore, COLLECTION_PATH);
    const docRef = await addDoc(bookCollection, book.toDocumentData());
    book.id = docRef.id;
    return docRef.id;
  }

  getBook(id: string): Observable<Book | undefined> {
    const bookDoc = doc(this.firestore, COLLECTION_PATH, id);
    return docData(bookDoc).pipe(
      map((fBook) => (fBook ? Book.fromDocumentData(fBook) : undefined)),
      shareReplay(1)
    );
  }

  getBooks(term?: string): Observable<Book[]> {
    if (!term || term.trim().length === 0) return this.getAllBooks();

    return this.getAllBooks(false, true).pipe(
      map((books) =>
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(term.toLowerCase()) ||
            book.author.toLowerCase().includes(term.toLowerCase()) ||
            book.genre.toLowerCase().includes(term.toLowerCase()) ||
            book.year.toString().includes(term.toLowerCase())
        )
      )
    );
  }

  private getAllBooks(rateLimit = true, cache = false): Observable<Book[]> {
    const bookCollection = this.cachedFetch(cache);
    const bookQuery = rateLimit
      ? query(bookCollection, limit(10))
      : bookCollection;

    return collectionData(bookQuery, { idField: 'id' }).pipe(
      map((books) => books.map((fBook) => Book.fromDocumentData(fBook))),
      shareReplay(1)
    );
  }

  private cachedFetch(cache: boolean): CollectionReference<DocumentData> {
    if (!cache) {
      return collection(this.firestore, COLLECTION_PATH);
    }

    if (!this.cachedBooks) {
      this.cachedBooks = collection(this.firestore, COLLECTION_PATH);
    }

    return this.cachedBooks;
  }
}
