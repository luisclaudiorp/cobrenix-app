import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, Language } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit {
  currentLanguage: Language = 'pt';
  isOpen = false;
  languages: { code: Language; name: string }[];

  constructor(public languageService: LanguageService) {
    this.languages = this.languageService.languages;
  }

  ngOnInit() {
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: Language, event: MouseEvent) {
    event.stopPropagation();
    if (lang !== this.currentLanguage) {
      this.languageService.setLanguage(lang);
    }
    this.isOpen = false;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
