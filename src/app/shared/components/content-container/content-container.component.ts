import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss'
})
export class ContentContainerComponent {
  isContentPage = false;

  constructor(private router: Router) {
    // Verifica o estado inicial
    this.isContentPage = this.router.url !== '/';

    // Monitora mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isContentPage = event.url !== '/';
      });
  }
}
