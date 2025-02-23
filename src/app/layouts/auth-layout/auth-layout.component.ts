import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService, Language } from '../../core/services/language.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent implements OnInit {
  currentLanguage: Language = 'pt';
  isDarkTheme = false;

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Inicializa o idioma atual
    this.currentLanguage = this.languageService.getCurrentLanguage();

    // Inscreve para mudanças de idioma
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    // Inicializa e inscreve para mudanças de tema
    this.themeService.theme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }

  toggleTheme(isDark: boolean) {
    this.isDarkTheme = isDark;
    this.themeService.setTheme(isDark ? 'dark' : 'light');
  }

  toggleLanguage() {
    const newLang = this.currentLanguage === 'pt' ? 'en' : 'pt';
    this.languageService.setLanguage(newLang);
  }
}
