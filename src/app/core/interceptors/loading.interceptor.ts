import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Não mostra loading para algumas URLs específicas se necessário
  if (req.url.includes('some-url-to-ignore')) {
    return next(req);
  }

  loadingService.show();

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        // Se desejar, pode adicionar um pequeno delay aqui para evitar flashes
        setTimeout(() => loadingService.hide(), 200);
      }
    }),
    finalize(() => {
      // Garante que o loading seja escondido mesmo em caso de erro
      setTimeout(() => loadingService.hide(), 200);
    })
  );
};
