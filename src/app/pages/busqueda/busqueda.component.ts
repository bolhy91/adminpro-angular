import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.mode';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  termino: string;
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params.subscribe(param => {
      this.termino = param['termino'];
      if (this.termino) {
        this.buscar(this.termino);
      }
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    this.http.get(`${environment.url}busqueda/todo/${termino}`)
    .subscribe((res: any) => {
      console.log(res);
      this.usuarios = res.usuarios;
      this.medicos = res.medicos;
      this.hospitales = res.hospitales;
    });
  }

}
