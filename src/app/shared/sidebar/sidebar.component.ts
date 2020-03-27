import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(private _sidebar: SidebarService, private user: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.user.usuario;
    this._sidebar.cargarMenu();
  }

}
