import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CourseListComponent} from './containers/course-list.component';
import {CourseService} from './service/course.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {CourseViewComponent} from './containers/course-view.component';
import {CourseEditComponent} from './containers/course-edit.component';
import {MatTabsModule} from '@angular/material';
import {LevelOfStudiesService} from '../levelofstudies/service/level-of-studies.service';
import {DepartmentService} from '../department/service/department.service';
import {TeachingTypeService} from '../teachingtype/service/teaching-type.service';

export const COURSE_ROUTES: Routes = [
  {path: 'list', component: CourseListComponent},
  {path: 'view/:courseId', component: CourseViewComponent},
  {path: 'edit/:courseId', component: CourseEditComponent}
];

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxDatatableModule,
    MatTabsModule,
    SharedModule
  ],
  declarations: [
    CourseListComponent,
    CourseViewComponent,
    CourseEditComponent
  ],
  providers: [
    CourseService,
    LevelOfStudiesService,
    DepartmentService,
    TeachingTypeService
  ],
  exports: []
})
export class CourseModule {
}
