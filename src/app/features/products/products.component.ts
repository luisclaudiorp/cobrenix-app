import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <h2>{{ getTitle() }}</h2>
      <p>Esta é uma página temporária para o módulo de Produtos.</p>
      <div class="type-label">{{ getType() | titlecase }}</div>
    </div>
  `,
  styleUrls: ['../shared/feature-container.scss'],
  styles: [`
    :host {
      display: block;
      margin: 1rem;
    }
    .products-container {
      @extend .feature-container;
    }
  `]
})
export class ProductsComponent {
  constructor(private route: ActivatedRoute) {}

  getTitle(): string {
    return this.getType() === 'list' ? 'Lista de Produtos' : 'Cadastro de Produtos';
  }

  getType(): string {
    return this.route.snapshot.url[0]?.path || 'list';
  }
}