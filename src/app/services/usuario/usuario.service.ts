import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import * as swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient,
    private router: Router,
    private SubirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  usuario: Usuario;
  token: string;

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${environment.url}usuario`, usuario).pipe(map((res: any) => {
      swal('Usuario creado', usuario.correo, 'success');
      return res.usuario;
    }));
  }

  loginUsuario(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.correo);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${environment.url}login`, usuario)
    .pipe(map((res: any) => {
      this.guardarStorage(res.id, res.token, res.usuario);
      return true;
    }));
  }

  loginGoogle(token: string) {
    return this.http.post(`${environment.url}login/google`, { token })
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      }));
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logout() {
    localStorage.clear();
    this.usuario = null;
    this.token = '';
    this.router.navigate(['/login']);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${environment.url}usuario/${usuario._id}?token=${this.token}`, usuario).pipe(map((res:any) => {
      this.guardarStorage(res.usuario._id, this.token, res.usuario);
      swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen(file:File, id: string){
    this.SubirArchivoService.subirArchivo(file, 'usuarios', id).then((resp: any) => {
      console.log(resp);
      this.usuario.img = resp.usuario.img;
      swal("Imagen Actualizada", this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario);
    }).catch(error => {
      console.log(error);
    });
  }

}
