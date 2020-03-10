import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuario'): any {
    let url = environment.url + 'img';
    if (!imagen) {
      return url + '/usuarios/xxx';
    }
    if (imagen.indexOf('https') >= 0) {
      return imagen;
    }

    switch (tipo) {
      case 'usuario':
         url += '/usuarios/' + imagen;
         break;
      case 'medico':
        url += '/medicos/' + imagen;
        break;

      case 'hospital':
        url += '/hospitales/' + imagen;
        break;

      default:
        url += '/usuarios/xxx';
    }
    return url;
  }

}
