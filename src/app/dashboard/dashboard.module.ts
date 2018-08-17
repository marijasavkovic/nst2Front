import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,

    DashboardRoutingModule
  ],
  declarations: [DashboardHomeComponent]
})
export class DashboardModule {
}
