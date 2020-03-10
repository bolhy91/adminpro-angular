import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario/usuario.service';
import { Medico } from '../models/medico.mode';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(public http: HttpClient, private userService: UsuarioService) { }

  cargarMedicos() {
    return this.http.get(`${environment.url}medico`).pipe(map( (res: any) => {
      this.totalMedicos = res.total;
      console.log(res);
      return res.medicos;
    }));
  }

  buscarMedico(termino: string) {
    let url = environment.url + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map((res: any) => res.medicos));
  }

  borrarMedico(id: string) {
    return this.http.delete(`${environment.url}medico/${id}?token=${this.userService.token}`).pipe(map(res => {
      alert("Medico Borrado");
      return res;
    }));
  }

  guardarMedico(medico: Medico) {
    if (medico._id) {
      return this.http.put(`${environment.url}medico/${medico._id}?token=${this.userService.token}`, medico).pipe(map((res: any) => {
        alert("Medico actualizado con exito");
        return res.medico;
      }));
    } else {
      return this.http.post(`${environment.url}medico?token=${this.userService.token}`, medico).pipe(map((res: any) => {
        alert("Medico creado con exito");
        return res.medico;
      }));
    }
  }

  obtenerMedicoById(id: string) {
    return this.http.get(`${environment.url}medico/${id}`).pipe(map((res: any) => res.medico));
  }

}
