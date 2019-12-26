import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;
  constructor() {

    this.regresaObservable().pipe(
      retry(2)
    ).subscribe( numero => {
      console.log('subs Retry', numero);
    }, (error) => console.error("Error obs: ", error),
    () => console.log('El observador de retry termino')
    );

    this.regresaMapObservable().subscribe(numero => {
      console.log('subs Map', numero);
    }, (error) => console.error("Error obs: ", error),
      () => console.log('El observador de Map termino')
    );


    this.subcription = this.regresaFilterObservable().subscribe(numero => {
      console.log('subs filter', numero);
    }, (error) => console.error("Error obs filter: ", error),
      () => console.log('El observador de Filter termino')
    );

  }

  ngOnInit() {
  }

  regresaObservable(): Observable<number> {
    return new Observable(observer => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        observer.next(contador);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (contador === 2) {
          //clearInterval(intervalo);
          observer.error('auxilio');
        }

      }, 1000);

    });
  }

  regresaMapObservable(): Observable<any> {
    return new Observable(observer => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

      }, 1000);

    }).pipe(map(resp => resp.valor ));
  }

  regresaFilterObservable(): Observable<any> {
    return new Observable(observer => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

      }, 1000);

    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          //impar
          return true;
        } else {
          return false;
        }
      }),
      );
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
