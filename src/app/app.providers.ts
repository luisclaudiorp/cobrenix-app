import { PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './core/services/language.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const APP_PROVIDERS = [
  TranslateService,
  {
    provide: LanguageService,
    useClass: LanguageService,
    deps: [PLATFORM_ID, TranslateService]
  }
];