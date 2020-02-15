import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import * as swal from 'sweetalert';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;
  constructor(private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.correo = usuario.correo;
    }

    this.usuarioService.actualizarUsuario(this.usuario)
    .subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  seleccionImage(archivo: any) {
    console.log(archivo);
    if (!archivo) {
      this.imagenSubir = null;
      return
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Error Imagen', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const render = new FileReader();
    let url = render.readAsDataURL(archivo);
    render.onloadend = () => {
      console.log(render.result);
      this.imagenTemp = render.result;
    };
  }

  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
