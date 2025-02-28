import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="companies-container">
      <h2>{{ getTitle() }}</h2>
      <p>Esta é uma página temporária para o módulo de Empresas.</p>
      <div class="type-label">{{ getType() | titlecase }}</div>
    </div>
  `,
  styleUrls: ['../shared/feature-container.scss'],
  styles: [`
    :host {
      display: block;
      margin: 1rem;
    }
    .companies-container {
      @extend .feature-container;
    }
  `]
})
export class CompaniesComponent {
  constructor(private route: ActivatedRoute) {}

  getTitle(): string {
    return this.getType() === 'list' ? 'Lista de Empresas' : 'Cadastro de Empresas';
  }

  getType(): string {
    return this.route.snapshot.url[0]?.path || 'list';
  }
}