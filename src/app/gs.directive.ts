import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FileMeta } from './admin-dashboard/books/book-type';
import { StorageService } from './shared/storage.service';

@Directive({
  selector: '[appGs]',
})
export class GsDirective implements OnInit {
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
