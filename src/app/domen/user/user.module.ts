import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './containers/user-list.component';
import {UserService} from './service/user.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {UserViewComponent} from './containers/user-view.component';
import {UserEditComponent} from './containers/user-edit.component';
import {EmployeeEditComponent} from '../employee/containers/employee-edit.component';

export const USER_ROUTES: Routes = [
  {path: 'list', component: UserListComponent},
  {path: 'view/:userId', component: UserViewComponent},
  {path: 'edit/:userId', component: UserEditComponent},
  {path: 'new', component: UserEditComponent,  data: { isNew: true }}
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
    UserListComponent,
    UserViewComponent,
    UserEditComponent
  ],
  providers: [
    UserService
  ],
  exports: []
})
export class UserModule {
}
