import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-review-summary',
  templateUrl: './book-review-summary.component.html',
  styleUrls: ['./book-review-summary.component.css'],
})
export class BookReviewSummaryComponent {
  @Input() likes = 0;
}
