import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isInitializing$ = this.loadingService.loading$;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private titleService: Title,
    private router: Router
  ) {
    this.isInitializing$ = this.loadingService.loading$;
    
    // Configura o idioma padrão
    this.translate.setDefaultLang('pt');
    this.translate.use(this.languageService.getCurrentLanguage());

    // Inscreve para mudanças de idioma
    this.languageService.language$.subscribe(lang => {
      this.translate.use(lang);
    });

    // Mantém o título da aplicação
    this.titleService.setTitle('CobreNix');

    // Observa mudanças de rota para manter o título
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle('CobreNix');
      }
    });
  }

  async ngOnInit() {
    try {
      this.loadingService.show();
      await this.authService.initializeAuth();
    } finally {
      this.loadingService.hide();
    }
  }
}
