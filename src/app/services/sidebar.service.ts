import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Progress Bar', url: '/progress' },
  //       { titulo: 'Graficas', url: '/grafica1' },
  //       { titulo: 'promesas', url: '/promesas' },
  //       { titulo: 'Rxjs', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Medicos', url: '/medicos' },
  //     ]
  //   }
  // ];

  menu: any = [];

  constructor(public usuarioService: UsuarioService) {

  }

  cargarMenu() {
    this.menu = this.usuarioService.menu;
  }
}
