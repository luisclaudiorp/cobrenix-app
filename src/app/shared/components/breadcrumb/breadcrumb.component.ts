import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

interface BreadcrumbItem {
  label: string;
  url: string;
  translationKey?: string;
  roles?: string[];
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

  private currentUserRole: string | null = null;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUserRole = user?.role || null;
      this.breadcrumbs = this.createBreadcrumbs();
    });
  }

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

    // Se o mainTranslationKey está vazio, significa que o usuário não tem acesso
    if (!mainTranslationKey) {
      return breadcrumbs;
    }

    // Se há um subcaminho (listar/cadastrar), usa ele
    if (paths.length > 1) {
      const subSection = paths[1];
      const subTranslationKey = this.getTranslationKey(subSection);
      
      // Adiciona a seção principal
      breadcrumbs.push({ 
        label: mainTranslationKey,
        url: `${mainUrl}/${subSection}`,
        translationKey: mainTranslationKey
      });

      // Adiciona a subseção se ela existe
      if (subTranslationKey) {
        breadcrumbs.push({ 
          label: subTranslationKey,
          url: `${mainUrl}/${subSection}`,
          translationKey: subTranslationKey
        });
      }
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
    const pathLower = path.toLowerCase();
    
    // Mapeamento de caminhos para chaves de tradução e roles necessárias
    const pathMap: { [key: string]: { key: string; roles?: string[] } } = {
      'clients': { key: 'MENU.CLIENTS' },
      'products': { key: 'MENU.PRODUCTS' },
      'sales': { key: 'MENU.SALES' },
      'companies': { key: 'MENU.COMPANIES', roles: ['admin'] },
      'others': { key: 'MENU.OTHERS' },
      'user': { key: 'MENU.USER' },
      'list': { key: 'MENU.LIST' },
      'register': { key: 'MENU.REGISTER' },
      'new': { key: 'MENU.REGISTER' },
      'edit': { key: 'MENU.EDIT' },
      'profile': { key: 'OTHERS_MENU.PROFILE' }
    };

    const pathConfig = pathMap[pathLower];
    
    if (pathConfig) {
      // Se o caminho requer roles específicas e o usuário não tem a role necessária
      if (pathConfig.roles && (!this.currentUserRole || !pathConfig.roles.includes(this.currentUserRole))) {
        return '';  // Retorna vazio para indicar que este item não deve ser mostrado
      }
      return pathConfig.key;
    }

    return this.formatLabel(path);
  }

  private formatLabel(path: string): string {
    // Primeira letra maiúscula e remove hífens/underscores
    return path.charAt(0).toUpperCase() + 
           path.slice(1).toLowerCase().replace(/[-_]/g, ' ');
  }
}
