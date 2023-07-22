import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface Link {
  name: string;
  route: string;
  isActive: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnDestroy {
  @Input() activeLink?: string;

  router = inject(Router);
  subscription: Subscription;
  links: Link[] = [
    { name: 'Početna', route: '/admin' },
    { name: 'Knjige', route: '/admin/books' },
  ].map((link) => ({ ...link, isActive: false }));

  constructor() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.links = this.links.map((link) => ({
          ...link,
          isActive: this.activeLink
            ? this.activeLink === link.route
            : link.route === event.url,
        }));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
