import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { GraficoDonna } from './grafico-donna.interface';

@Component({
  selector: 'app-grafico-donna',
  templateUrl: './grafico-donna.component.html'
})
export class GraficoDonnaComponent implements OnInit {

  @Input() grafico: GraficoDonna;

  constructor() { }

  ngOnInit() {
  }

}
