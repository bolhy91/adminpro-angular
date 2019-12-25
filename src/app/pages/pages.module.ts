import { GraficoDonnaComponent } from './../components/grafico-donna/grafico-donna.component';
import { IncrementadorComponent } from './../components/incrementador/incrementador.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from './../shared/shared.module';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PageRoutingModule } from './pages.routes';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    //temporal
    IncrementadorComponent,
    GraficoDonnaComponent,
    AccountSettingsComponent
  ],
  imports: [
    PageRoutingModule,
    SharedModule,
    FormsModule,
    ChartsModule
  ],
  exports: [DashboardComponent, ProgressComponent, Grafica1Component]
})
export class PagesModule { }
