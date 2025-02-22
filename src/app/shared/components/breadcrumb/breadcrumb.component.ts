import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface BreadcrumbItem {
  label: string;
  url: string;
  translationKey?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    // Cria o breadcrumb inicial
    this.breadcrumbs = this.createBreadcrumbs();

    // Atualiza o breadcrumb quando a rota muda
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs();
      });

    // Atualiza o breadcrumb quando o idioma muda
    this.translate.onLangChange.subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs();
    });
  }

  private createBreadcrumbs(): BreadcrumbItem[] {
    const paths = this.router.url.split('/').filter(path => path);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Sempre adiciona Home como primeiro item
    breadcrumbs.push({ label: 'MENU.HOME', url: '/', translationKey: 'MENU.HOME' });

    // Se não há caminhos adicionais, retorna apenas 'HOME'
    if (paths.length === 0 || (paths.length === 1 && paths[0] === '')) {
      return breadcrumbs;
    }

    // Pega o primeiro caminho (seção principal)
    const mainSection = paths[0];
    const mainUrl = `/${mainSection}`;
    const mainTranslationKey = this.getTranslationKey(mainSection);

    // Se há um subcaminho (listar/cadastrar), usa ele
    if (paths.length > 1) {
      const subSection = paths[1];
      const subTranslationKey = this.getTranslationKey(subSection);
      breadcrumbs.push(
        { 
          label: mainTranslationKey,
          url: `${mainUrl}/${subSection}`,
          translationKey: mainTranslationKey
        },
        { 
          label: subTranslationKey,
          url: `${mainUrl}/${subSection}`,
          translationKey: subTranslationKey
        }
      );
    } else {
      // Se não há subcaminho, apenas adiciona a seção principal
      breadcrumbs.push({ 
        label: mainTranslationKey,
        url: mainUrl,
        translationKey: mainTranslationKey
      });
    }

    return breadcrumbs;
  }

  private getTranslationKey(path: string): string {
    switch (path.toLowerCase()) {
      case 'clients':
        return 'MENU.CLIENTS';
      case 'products':
        return 'MENU.PRODUCTS';
      case 'sales':
        return 'MENU.SALES';
      case 'others':
        return 'MENU.OTHERS';
      case 'user':
        return 'MENU.USER';
      case 'list':
        return 'MENU.LIST';
      case 'register':
        return 'MENU.REGISTER';
      case 'profile':
        return 'OTHERS_MENU.PROFILE';
      default:
        return this.formatLabel(path);
    }
  }

  private formatLabel(path: string): string {
    // Primeira letra maiúscula e remove hífens/underscores
    return path.charAt(0).toUpperCase() + 
           path.slice(1).toLowerCase().replace(/[-_]/g, ' ');
  }
}
