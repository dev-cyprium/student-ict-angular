import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

const AngularFirestoreStub = {
  collection: (_name: string) => {
    return {
      valueChanges: () =>
        of([
          // Mocked Firestore data
          {
            title: 'Test Book',
            author: 'Test Author',
            year: 2000,
            pages: 300,
            genre: 'Fiction',
            path: 'test/path',
          },
        ]),
    };
  },
};

export const firebaseImports = [
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage()),
];

export const mockFirebaseProviders = [
  { provide: Firestore, useValue: AngularFirestoreStub },
];
