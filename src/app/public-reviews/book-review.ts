export const MAX_DESCRIPTION_LENGTH = 500;

export interface ReviewUserData {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface BookReview {
  id: string | undefined;
  title: string;
  description: string;
  bookId: string | undefined;
  user: ReviewUserData | null;
}

export function bookReviewToDoc(book: BookReview): Record<string, unknown> {
  return {
    title: book.title,
    description: book.description,
    bookId: book.bookId,
    user: book.user,
  };
}
