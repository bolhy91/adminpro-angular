import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { NgModule } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const pageRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dasboard'}
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(pageRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}

