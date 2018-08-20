import {EMPLOYEE_ROUTES} from './employee/employee.module';
import {COURSE_ROUTES} from './course/course.module';
import {USER_ROUTES} from './user/user.module';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

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
