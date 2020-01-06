import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {

  constructor(private _sidebar: SidebarService, private user: UsuarioService) { }

  ngOnInit() {
    console.log(this._sidebar.menu)
  }

}
