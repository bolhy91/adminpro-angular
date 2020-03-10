import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario/usuario.service';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';
import * as swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,
    private router: Router,
    private subirArchivo: SubirArchivoService,
    private usuarioService: UsuarioService) { }


cargarHospitales(desde: number = 0) {
  return this.http.get(`${environment.url}hospital?desde=${desde}`);
}

obtenerHospitalId(id: string) {
  return this.http.get(`${environment.url}hospital/${id}`);
}

  borrarHospital(id: string) {
    let url = environment.url + `hospital/${id}`;
    url += `?token=${this.usuarioService.token}`;
    return this.http.delete(url).pipe(map(res => {
      swal("Hospital borrado", "El hospital fue eliminado correctamente", "success");
      return true;
    }));
  }

  crearHospital(nombre: string) {
    return this.http.post(`${environment.url}hospital`, {nombre});
  }

  actualizarHospital(hospital: Hospital) {
    return this.http.put(`${environment.url}hospital/${hospital._id}?token=${this.usuarioService.token}`, hospital)
      .pipe(map((res: any) => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      }));
  }

  buscarHospital(termino: string) {
    let url = environment.url + 'busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((res: any) => res.hospitales));
  }

}

