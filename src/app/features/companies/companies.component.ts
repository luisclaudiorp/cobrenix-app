import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="companies-container">
      <h2>{{ getTitle() | translate }}</h2>
      <p>{{ 'FEATURE.TEMPORARY_PAGE' | translate:{ module: ('FEATURE.MODULES.COMPANIES' | translate) } }}</p>
      <div class="type-label">{{ 'FEATURE.TYPE.' + getType().toUpperCase() | translate }}</div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin: 1rem;
    }
    .companies-container {
      padding: 2rem;
      background: var(--card-background);
      border-radius: 8px;
      box-shadow: var(--user-info-box-shadow);
      border: var(--user-info-border);
      transition: all 0.3s ease;
    }
    h2 {
      color: var(--logo-color-main);
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 500;
      text-shadow: var(--text-shadow);
    }
    p {
      color: var(--text-color);
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    .type-label {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: var(--hover-color);
      border-radius: 4px;
      color: var(--text-color);
      font-size: 0.9rem;
      margin-top: 1rem;
    }
  `]
})
export class CompaniesComponent {
  constructor(private route: ActivatedRoute) {}

  getTitle(): string {
    const type = this.getType().toUpperCase();
    return `FEATURE.TYPE.${type}`;
  }

  getType(): string {
    return this.route.snapshot.url[0]?.path || 'list';
  }
}