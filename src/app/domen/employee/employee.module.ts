import {EmployeeListComponent} from './containers/employee-list.component';
import {EmployeeService} from './service/employee.service';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const EMPLOYEE_ROUTES: Routes = [
  {path: 'list', component: EmployeeListComponent}
];

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxDatatableModule,
    SharedModule
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
