import { environment } from 'src/environments/environment';
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
  menu: any = {};

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
      this.guardarStorage(res.id, res.token, res.usuario, res.menu);
      return true;
    }));
  }

  loginGoogle(token: string) {
    return this.http.post(`${environment.url}login/google`, { token })
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      }));
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  logout() {
    localStorage.clear();
    this.usuario = null;
    this.token = '';
    this.router.navigate(['/login']);
    this.menu = [];
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${environment.url}usuario/${usuario._id}?token=${this.token}`, usuario)
    .pipe(map((res:any) => {

      if (usuario._id === this.usuario._id) {
        this.guardarStorage(res.usuario._id, this.token, res.usuario, this.menu);
      }

      swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen(file:File, id: string){
    this.SubirArchivoService.subirArchivo(file, 'usuarios', id).then((resp: any) => {
      console.log(resp);
      this.usuario.img = resp.usuario.img;
      swal("Imagen Actualizada", this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
    }).catch(error => {
      console.log(error);
    });
  }

  cargarUsuarios(desde: number = 0) {
    let url = `${environment.url}usuario?desde=${desde}`;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
        let url = environment.url + 'busqueda/coleccion/usuarios/' + termino;
        return this.http.get(url).pipe(map((res: any) => res.usuarios));
  }

  borrarUsuario(id: string){
    let url = environment.url + `usuario/${id}`;
    url +=`?token=${this.token}`;
    return this.http.delete(url).pipe(map(res => {
      swal("Usuario borrado", "El usuario fue eliminado correctamente", "success");
      return true;
    }));
  }

  renuevaToken() {
    return this.http.get(`${environment.url}login/renuevatoken?token=${this.token}`)
    .pipe(map((res: any) => {
      this.token = res.token;
      localStorage.setItem('token', this.token);
      return true;
    }));
  }

}
