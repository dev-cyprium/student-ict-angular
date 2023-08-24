import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../http/reviews/review.service';
import { BookReview } from './book-review';

@Component({
  selector: 'app-public-reviews',
  templateUrl: './public-reviews.component.html',
  styleUrls: ['./public-reviews.component.css'],
})
export class PublicReviewsComponent implements OnInit {
  reviews: BookReview[] = [];

  @Input() bookId!: string;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.listReviewsForBook(this.bookId).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }
}
