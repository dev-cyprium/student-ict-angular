import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, map, shareReplay } from 'rxjs';
import {
  BookReview,
  bookReviewToDoc,
} from 'src/app/public-reviews/book-review';

const COLLECTION_PATH = 'reviews';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  firestore = inject(Firestore);

  public async createPublicReview(review: BookReview): Promise<string | null> {
    if (typeof review.id !== 'undefined') return null;

    const reviewCollection = collection(this.firestore, COLLECTION_PATH);
    const docRef = await addDoc(reviewCollection, bookReviewToDoc(review));
    review.id = docRef.id;
    return docRef.id;
  }

  public listReviewsForBook(bookId: string): Observable<BookReview[]> {
    const reviewCollection = collection(this.firestore, COLLECTION_PATH);
    const reviewQuery = query(reviewCollection, where('bookId', '==', bookId));

    return collectionData(reviewQuery, { idField: 'id' }).pipe(
      map((reviews) => reviews.map((review) => ({ ...review } as BookReview))),
      shareReplay(1)
    );
  }
}
