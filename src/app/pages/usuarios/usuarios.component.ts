import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import * as swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(private UsuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notification.subscribe(res => {
      this.cargarUsuarios();
    });
  }

  mostrarModal(id: string){
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this.UsuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      console.log(resp);
      this.cargando = false;
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.UsuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario) => {
      this.cargando = false;
      this.usuarios = usuarios;
      console.log(usuarios);
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.UsuarioService.usuario._id) {
      alert("No puede borrar usuario, No puede eliminarse a si mismo.");
      return;
    }

  if (confirm("Esta seguro de eliminar al usuario?")) {
    this.UsuarioService.borrarUsuario(usuario._id).subscribe(res => {
      this.cargarUsuarios();
    })
  }
}

  guardarUsuario(usuario: Usuario) {
    this.UsuarioService.actualizarUsuario(usuario).subscribe();
  }

}
