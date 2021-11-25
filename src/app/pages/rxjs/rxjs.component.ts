import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  public obs$: Subscription;
  public intervalSub: Subscription;

  constructor() {


    this.returnObservable().pipe(
      retry(10)
    ).subscribe(
      valor => console.log(valor),
      error => console.warn(error),
      () => console.log("OBS TERMINADO"));

    this.intervalSub = this.returnInterval().subscribe(valor => console.log(valor))
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
    this.obs$.unsubscribe()
  }

  returnInterval(): Observable<number> {
    return interval(1000)
      .pipe(
        take(100),
        map(valor => valor + 1),
        filter(valor => valor % 2 === 0)
      );

  }

  returnObservable(): Observable<number> {
    let i = 0;

    return new Observable(observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 2) {
          observer.error(i);
        }
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    });
  }

}
