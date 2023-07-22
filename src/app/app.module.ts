import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { PublicBookListComponent } from './public/public-book-list/public-book-list.component';
import { HomeComponent } from './home/home.component';
import { PublicBookListDetailsComponent } from './public/public-book-list-details/public-book-list-details.component';
import { PublicBookDetailsPageComponent } from './public/public-book-details-page/public-book-details-page.component';
import { SharedModule } from './shared/shared.module';
import { BookReviewSummaryComponent } from './public/book-review-summary/book-review-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicBookListComponent,
    HomeComponent,
    PublicBookListDetailsComponent,
    PublicBookDetailsPageComponent,
    BookReviewSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
