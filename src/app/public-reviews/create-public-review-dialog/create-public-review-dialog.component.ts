import { FormControl } from '@angular/forms';
import { BookReview, MAX_DESCRIPTION_LENGTH } from '../book-review';
import { Component, Inject } from '@angular/core';
import { ReviewService } from 'src/app/http/reviews/review.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-create-public-review-dialog',
  templateUrl: './create-public-review-dialog.component.html',
})
export class CreatePublicReviewDialogComponent {
  review: BookReview = {
    id: undefined,
    bookId: undefined,
    title: '',
    description: '',
    user: null,
  };

  titleControl = new FormControl(this.review.title);
  descriptionControl = new FormControl(this.review.description);

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<CreatePublicReviewDialogComponent>,
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) private data: { bookId: string | undefined }
  ) {
    if (this.authService.user) {
      this.review.user = {
        uid: this.authService.user.uid,
        displayName: this.authService.user.displayName,
        photoURL: this.authService.user.photoURL,
      } as never;
    }
    this.review.bookId = this.data.bookId;
    this.titleControl.valueChanges.subscribe((value) => {
      if (value) {
        this.review.title = value;
      }
    });

    this.descriptionControl.valueChanges.subscribe((value) => {
      if (value) {
        this.review.description = this.truncate(value, MAX_DESCRIPTION_LENGTH);
        this.descriptionControl.setValue(this.review.description, {
          emitEvent: false,
        });
      }
    });
  }

  allowedLengthAsNumber(): number {
    return MAX_DESCRIPTION_LENGTH - this.review.description.length;
  }

  async onSubmit(): Promise<void> {
    await this.reviewService.createPublicReview(this.review);
    this.dialogRef.close();
  }

  private truncate(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength);
    }

    return text;
  }
}
