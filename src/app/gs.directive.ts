import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  inject,
  signal,
} from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { FileMeta } from './admin-dashboard/books/book-type';
import { StorageService } from './shared/storage.service';

@Directive({
  selector: '[appGs]',
})
export class GsDirective {
  storage = inject(Storage);
  @Input() appGs?: FileMeta | null;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (!this.appGs) return;
    if (!this.appGs?.path) return;

    this.storageService.getDownloadUrl(this.appGs.path).subscribe((url) => {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'src', url);
    });
  }
}
