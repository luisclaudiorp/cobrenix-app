import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private requestCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;
  private minLoadingTime = 500; // Tempo mínimo de exibição do loading em ms
  private loadingStartTime = 0;

  public loading$ = this.loadingSubject.pipe(
    distinctUntilChanged(),
    map((loading) => {
      if (this.isBrowser) {
        const body = document.body;
        const initializer = document.querySelector('.app-initializing');

        if (loading) {
          body.classList.add('loading-active');
        } else {
          body.classList.remove('loading-active');
          // Remove o loading inicial quando o app estiver pronto
          if (initializer) {
            initializer.remove();
          }
        }
      }
      return loading;
    })
  );

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  show() {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loadingStartTime = Date.now();
      this.loadingSubject.next(true);
    }
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.loadingStartTime;
      const remainingTime = Math.max(0, this.minLoadingTime - elapsedTime);

      if (remainingTime > 0) {
        timer(remainingTime).subscribe(() => {
          this.loadingSubject.next(false);
        });
      } else {
        this.loadingSubject.next(false);
      }
    }
  }

  forceHide() {
    this.requestCount = 0;
    this.loadingSubject.next(false);
  }
}
