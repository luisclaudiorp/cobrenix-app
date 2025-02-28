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
      <p>Tipo: {{ getType() }}</p>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 2rem;
      background: var(--background-color);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: var(--primary-color);
      margin-bottom: 1rem;
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