import { DocumentData } from '@angular/fire/firestore';

export type FileMeta =
  | {
      file: File;
      path: null;
    }
  | {
      file: null;
      path: string;
    };

export class FirestoreBook {
  constructor(
    public title: string,
    public author: string,
    public year: number,
    public pages: number,
    public genre: string,
    public path?: string,
    public id?: string
  ) {}

  public static fromDocumentData(data: DocumentData): FirestoreBook {
    return new FirestoreBook(
      data['title'] as string,
      data['author'] as string,
      data['year'] as number,
      data['page'] as number,
      data['genre'] as string,
      data['path'] as string,
      data['id'] as string
    );
  }

  public serialize(): Record<string, unknown> {
    return {
      ...Object.keys(this).reduce((acc: Record<string, unknown>, key) => {
        if (this[key as keyof FirestoreBook]) {
          acc[key] = this[key as keyof FirestoreBook];
        }

        return acc;
      }, {}),
    };
  }

  public toBook(): Book {
    const b = new Book(
      this.title,
      this.author,
      this.year,
      this.pages,
      this.genre,
      undefined,
      this.id
    );

    if (this.path) {
      b.fileMeta = { file: null, path: this.path };
    }

    return b;
  }
}

export class Book extends FirestoreBook {
  public fileMeta: FileMeta | null = null;

  public toFirestoreBook(): FirestoreBook {
    return new FirestoreBook(
      this.title,
      this.author,
      this.year,
      this.pages,
      this.genre,
      this.fileMeta?.path || undefined,
      this.id
    );
  }
}
