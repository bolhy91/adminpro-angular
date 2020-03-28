import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { NgModule } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaRenuevaGuard } from '../services/guards/verifica-renueva.guard';

const pageRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'dashboard', canActivate: [VerificaRenuevaGuard], component: DashboardComponent, data: {titulo: 'Dasboard'}
      },
      {
        path: 'progress', component: ProgressComponent, data: { titulo: 'Progreso' }
      },
      {
        path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' }
      },
      {
        path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }
      },
      {
        path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' }
      },
      {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajustes del Tema' }
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        data: { titulo: 'Perfil del usuario' }
      },
      {
        path: 'busqueda/:termino',
        component: BusquedaComponent,
        data: { titulo: 'Busqueda' }
      },
      //Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Mantenimiento Usuarios' },
        canActivate: [AdminGuard]
      },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento Medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento Medico' } },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(pageRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}

