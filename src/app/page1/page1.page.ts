import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})

export class Page1Page {
  headerHidden = false;
  lastScrollTop = 0;

  onScroll(event: any) {
    const currentScroll = event.detail.scrollTop;

    if (currentScroll > this.lastScrollTop + 10) {
      this.headerHidden = true;
    } else if (currentScroll < this.lastScrollTop - 10 || currentScroll <= 0) {
      this.headerHidden = false;
    }

    this.lastScrollTop = currentScroll;
  }
}