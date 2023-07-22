import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { LayoutComponent } from './layout/layout.component';
import { BooksTableComponent } from './books/books-table/books-table.component';
import { BooksNewComponent } from './books/books-new/books-new.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/new', component: BooksNewComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    BooksComponent,
    LayoutComponent,
    BooksTableComponent,
    BooksNewComponent,
    BooksFormComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class AdminDashboardModule {}
