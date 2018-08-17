import {RouterModule, Routes} from '@angular/router';
import {EmployeeListComponent} from './containers/employee-list.component';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EmployeeService} from './service/employee.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

export const EMPLOYEE_ROUTES: Routes = [
  {path: 'list', component: EmployeeListComponent}
];

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxDatatableModule
  ],
  declarations: [
    EmployeeListComponent
  ],
  providers: [
    EmployeeService
  ],
  exports: []
})
export class EmployeeModule {}
