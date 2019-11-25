import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso', { static: false}) txtProgreso: ElementRef;
  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number) {

    // let elemHtml: any = document.getElementsByName('progreso')[0];

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHtml.value = Number(this.progreso);
    this.txtProgreso.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(n) {
    console.log(n);
    if (this.progreso >= 100 && n > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && n < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + n;

    this.cambioValor.emit(this.progreso);
    this.txtProgreso.nativeElement.focus();
  }


}
