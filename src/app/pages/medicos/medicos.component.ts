import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos: any[] = [];
  cargando: boolean;

  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargando = true;
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos().subscribe(res => {
      this.medicos = res;
      this.cargando = false;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this.medicoService.buscarMedico(termino).subscribe((medicos: any) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  borrarMedico(medico: any) {
    this.medicoService.borrarMedico(medico._id).subscribe(res => this.cargarMedicos());
  }

}
