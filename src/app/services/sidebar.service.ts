import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Graficas', url: '/grafica1' },
        { titulo: 'promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' }
      ]
    }
  ];

  constructor() {
    console.log("MI SERVICIO");
   }
}
