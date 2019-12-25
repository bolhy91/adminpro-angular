import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { NgModule } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pageRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'progress', component: ProgressComponent
      },
      {
        path: 'grafica1', component: Grafica1Component
      },
      {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(pageRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}

