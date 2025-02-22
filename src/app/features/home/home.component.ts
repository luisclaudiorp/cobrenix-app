import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="decorative-text" *ngIf="isHome">
      <span>C</span>
      <span>O</span>
      <span>B</span>
      <span>R</span>
      <span>E</span>
      <span>N</span>
      <span>I</span>
      <span>X</span>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isHome = false;

  constructor(private router: Router) {
    this.isHome = this.router.url === '/';
  }
}
