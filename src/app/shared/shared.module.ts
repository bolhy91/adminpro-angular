import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const COMPONENTS = [BreadcrumbsComponent, SidebarComponent, NopagefoundComponent, HeaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [...COMPONENTS]
})
export class SharedModule { }
