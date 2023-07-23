import { Injectable, inject } from '@angular/core';
import {
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
  where,
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  shareReplay,
} from 'rxjs';
import { Book } from 'src/app/admin-dashboard/books/book-type';

const COLLECTION_PATH = 'books';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  firestore = inject(Firestore);
  storage = inject(Storage);

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
    if (!term) return this.getAllBooks();

    const bookCollection = collection(this.firestore, COLLECTION_PATH);
    const titleQuery = query(
      bookCollection,
      where('title', 'array-contains', term),
      limit(10)
    );
    const authorQuery = query(
      bookCollection,
      where('author', 'array-contains', term),
      limit(10)
    );
    const yearQuery = query(
      bookCollection,
      where('year', '==', Number(term)),
      limit(10)
    );

    const queries$ = [titleQuery, authorQuery, yearQuery].map((q) =>
      collectionData(q, { idField: 'id' }).pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        })
      )
    );

    return combineLatest(queries$).pipe(
      map((booksArrays) => {
        const mergedBooks = ([] as DocumentData[]).concat(...booksArrays);
        return this.removeDuplicates(
          mergedBooks.map((fBook) => Book.fromDocumentData(fBook))
        );
      }),
      shareReplay(1)
    );
  }

  private getAllBooks(): Observable<Book[]> {
    const bookCollection = collection(this.firestore, COLLECTION_PATH);
    const bookQuery = query(bookCollection, limit(10));

    return collectionData(bookQuery, { idField: 'id' }).pipe(
      map((books) => books.map((fBook) => Book.fromDocumentData(fBook))),
      shareReplay(1)
    );
  }

  private removeDuplicates(books: Book[]): Book[] {
    return books.filter(
      (book, index, self) => index === self.findIndex((b) => b.id === book.id)
    );
  }
}
