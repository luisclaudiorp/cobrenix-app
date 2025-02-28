import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sales-container">
      <h2>{{ getTitle() }}</h2>
      <p>Esta é uma página temporária para o módulo de Vendas.</p>
      <div class="type-label">{{ getType() | titlecase }}</div>
    </div>
  `,
  styleUrls: ['../shared/feature-container.scss'],
  styles: [`
    :host {
      display: block;
      margin: 1rem;
    }
    .sales-container {
      @extend .feature-container;
    }
  `]
})
export class SalesComponent {
  constructor(private route: ActivatedRoute) {}

  getTitle(): string {
    return this.getType() === 'list' ? 'Lista de Vendas' : 'Cadastro de Vendas';
  }

  getType(): string {
    return this.route.snapshot.url[0]?.path || 'list';
  }
}