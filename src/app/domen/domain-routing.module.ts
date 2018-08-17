import {RouterModule, Routes} from '@angular/router';
import {EMPLOYEE_ROUTES} from './employee/employee.module';
import {NgModule} from '@angular/core';
import {COURSE_ROUTES} from './course/course.module';
import {USER_ROUTES} from './user/user.module';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employee',
        children: EMPLOYEE_ROUTES
      },
      {
        path: 'course',
        children: COURSE_ROUTES
      },
      {
        path: 'user',
        children: USER_ROUTES
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule {
}
