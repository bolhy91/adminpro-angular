import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NgModule } from '@angular/core';


const COMPONENTS = [BreadcrumbsComponent, SidebarComponent, NopagefoundComponent, HeaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
  ],
  exports: [...COMPONENTS]
})
export class SharedModule { }
