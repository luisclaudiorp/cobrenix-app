import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clients-container">
      <h2>{{ getTitle() }}</h2>
      <p>Esta é uma página temporária para o módulo de Clientes.</p>
      <p>Tipo: {{ getType() }}</p>
    </div>
  `,
  styles: [`
    .clients-container {
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
export class ClientsComponent {
  constructor(private route: ActivatedRoute) {}

  getTitle(): string {
    return this.getType() === 'list' ? 'Lista de Clientes' : 'Cadastro de Clientes';
  }

  getType(): string {
    return this.route.snapshot.url[0]?.path || 'list';
  }
}