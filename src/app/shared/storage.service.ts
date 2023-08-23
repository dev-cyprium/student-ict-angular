import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StorageService {
  storage = inject(Storage);
  private cache: { [path: string]: Observable<string> } = {};

  getDownloadUrl(path: string): Observable<string> {
    // If the URL exists in the cache, return it
    if (this.cache[path]) {
      return this.cache[path];
    }

    const r = ref(this.storage, '/' + path);
    // Otherwise, fetch the URL from Firebase and cache it
    const url$ = from(getDownloadURL(r)).pipe(
      shareReplay(1), // This ensures that the value is shared among all subscribers
      tap((url) => {
        this.cache[path] = of(url);
      })
    );

    this.cache[path] = url$;

    return url$;
  }
}
