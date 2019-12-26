import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  promesa: Promise<any>;
  constructor() {

    this.contarTres()
    .then((res) => console.log("termino: "+res))
    .catch( () => console.error("ERROR en la promesa"));
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
