import { FormControl } from '@angular/forms';
import { BookReview, MAX_DESCRIPTION_LENGTH } from '../book-review';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-public-review-dialog',
  templateUrl: './create-public-review-dialog.component.html',
})
export class CreatePublicReviewDialogComponent {
  review: BookReview = { id: undefined, title: '', description: '' };

  titleControl = new FormControl(this.review.title);
  descriptionControl = new FormControl(this.review.description);

  constructor() {
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

  onSubmit(): void {
    console.log(this.review);
  }

  private truncate(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength);
    }

    return text;
  }
}
