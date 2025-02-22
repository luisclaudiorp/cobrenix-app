import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'pt' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANG_KEY = 'selected-language';
  private isBrowser: boolean;
  private languageSubject = new BehaviorSubject<Language>('pt');
  public language$ = this.languageSubject.asObservable();

  public readonly languages: { code: Language; name: string }[] = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private translate: TranslateService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    if (this.isBrowser) {
      const savedLang = localStorage.getItem(this.LANG_KEY) as Language;
      const lang = savedLang || 'pt'; // Idioma padrão é português
      this.setLanguage(lang);
    }
  }

  private getBrowserLanguage(): Language {
    if (this.isBrowser) {
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith('pt') ? 'pt' : 'en';
    }
    return 'pt';
  }

  setLanguage(lang: Language): void {
    if (this.isBrowser) {
      localStorage.setItem(this.LANG_KEY, lang);
    }
    this.translate.use(lang);
    this.languageSubject.next(lang);
  }

  getCurrentLanguage(): Language {
    return this.languageSubject.value;
  }

  getLanguageName(code: Language): string {
    return this.languages.find(lang => lang.code === code)?.name || code;
  }
}
