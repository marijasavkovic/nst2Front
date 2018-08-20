import {EmployeeModule} from './employee/employee.module';
import {DomainRoutingModule} from './domain-routing.module';
import {CourseModule} from './course/course.module';
import {UserModule} from './user/user.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    EmployeeModule,
    CourseModule,
    UserModule,

    DomainRoutingModule
  ],
  declarations: [],
  providers: [],
  exports: []
})
export class DomainModule {
}
