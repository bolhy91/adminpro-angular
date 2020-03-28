import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaRenuevaGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expirado = this.expirado(payload.exp);
    if (expirado) {
      this.usuarioService.logout();
      return false;
    }


    return this.verficaRenueva(payload.exp);
  }

  expirado(fecha: number) {
    let ahora = new Date().getTime() / 1000;
    if (fecha < ahora) {
      return true;
    }
    return false;
  }

  verficaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();
      ahora.setTime( ahora.getTime() + (4 * 60 * 1000) );
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken()
        .subscribe( () => {
          resolve(true);
        }, () => {
          this.usuarioService.logout();
          reject(false);
        });
      }
    });
  }

}
