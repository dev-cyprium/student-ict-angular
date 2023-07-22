import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { LayoutComponent } from './layout/layout.component';
import { BooksTableComponent } from './books/books-table/books-table.component';
import { BooksNewComponent } from './books/books-new/books-new.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class AdminDashboardModule {}
