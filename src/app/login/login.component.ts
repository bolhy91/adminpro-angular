import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  correo: string;

  //google
  auht2: any;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();

    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 1) {
      this.recuerdame = true;
    }

    this.googleInit();
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.correo, forma.value.password)
    this.usuarioService.loginUsuario(usuario, forma.value.recuerdame).subscribe(res => {
      console.log(res);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
    });
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auht2 = gapi.auth2.init({
        client_id: `1039189348887-1i4hkgm4lkbrd6dsiikvk37m2efrska3.apps.googleusercontent.com`,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));

    });
  }

  attachSignIn(element) {
    this.auht2.attachClickHandler( element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile()
      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe(res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log(error);
      });
    });
  }

}
