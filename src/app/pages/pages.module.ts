import { PagesComponent } from './pages.component';
import { SharedModule } from './../shared/shared.module';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PageRoutingModule } from './pages.routes';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
  ],
  imports: [
    PageRoutingModule,
    SharedModule
  ],
  exports: [DashboardComponent, ProgressComponent, Grafica1Component]
})
export class PagesModule { }
