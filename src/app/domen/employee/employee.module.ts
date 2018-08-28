import {EmployeeListComponent} from './containers/employee-list.component';
import {EmployeeService} from './service/employee.service';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmployeeViewComponent} from './containers/employee-view.component';
import {EmployeeEditComponent} from './containers/employee-edit.component';

export const EMPLOYEE_ROUTES: Routes = [
  {path: 'list', component: EmployeeListComponent},
  {path: 'view/:employeeId', component: EmployeeViewComponent},
  {path: 'edit/:employeeId', component: EmployeeEditComponent},
  {path: 'new', component: EmployeeEditComponent,  data: { isNew: true }}
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
    EmployeeListComponent,
    EmployeeViewComponent,
    EmployeeEditComponent
  ],
  providers: [
    EmployeeService
  ],
  exports: []
})
export class EmployeeModule {}
