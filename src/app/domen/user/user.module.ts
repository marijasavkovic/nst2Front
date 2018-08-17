import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EmployeeListComponent} from '../employee/containers/employee-list.component';

export const USER_ROUTES: Routes = [
  {path: 'list', component: EmployeeListComponent}
];

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: []
})
export class UserModule {
}
