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

export class Book {
  public fileMeta?: FileMeta;

  constructor(
    public title: string,
    public author: string,
    public year: number,
    public pages: number,
    public genre: string,
    fileMeta?: FileMeta,
    public id?: string
  ) {
    this.fileMeta = fileMeta;
  }

  public static fromDocumentData(data: DocumentData): Book {
    const fileMeta = data['path']
      ? { file: null, path: data['path'] as string }
      : undefined;
    return new Book(
      data['title'] as string,
      data['author'] as string,
      data['year'] as number,
      data['pages'] as number,
      data['genre'] as string,
      fileMeta,
      data['id'] as string
    );
  }

  public toDocumentData(): Record<string, unknown> {
    const documentData: Record<string, unknown> = {
      title: this.title,
      author: this.author,
      year: this.year,
      pages: this.pages,
      genre: this.genre,
    };

    if (this.fileMeta?.path) {
      documentData['path'] = this.fileMeta.path;
    }

    if (this.id) {
      documentData['id'] = this.id;
    }

    return documentData;
  }
}
