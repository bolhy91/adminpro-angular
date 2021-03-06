import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(private user: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.user.usuario;
  }

  logout() {
    this.user.logout();
  }

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }

}
