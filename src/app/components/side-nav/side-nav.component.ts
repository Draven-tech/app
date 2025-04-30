import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  currentPage: string = 'page1';

  constructor(private router: Router) {}

  navigateTo(page: string) {
    this.currentPage = page;
    this.router.navigate([`/${page}`]);
  }
}
