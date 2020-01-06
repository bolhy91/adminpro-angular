import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, private router: Router) {}

  canActivate() {
    if (this.usuarioService.estaLogueado()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
