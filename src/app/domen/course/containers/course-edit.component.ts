import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {of} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map, switchMap} from 'rxjs/internal/operators';
import {Department} from '../../department/model/department';
import {LevelOfStudies} from '../../levelofstudies/model/level-of-studies';
import {Course} from '../model/course';
import {CourseService} from '../service/course.service';
import {CourseCmd} from '../model/course-cmd';
import {LevelOfStudiesService} from '../../levelofstudies/service/level-of-studies.service';
import {DepartmentService} from '../../department/service/department.service';
import {TeachingType} from '../../teachingtype/model/teaching-type';
import {TeachingTypeService} from '../../teachingtype/service/teaching-type.service';
import {EmployeeService} from '../../employee/service/employee.service';
import {EmployeeRecord} from '../../employee/model/employee-record';

class CourseFormModel {
  name: string;
  espb: number;
  goal: string;
  methodOfEvaluation: string;
  levelOfStudies: number;
  department: number;
}

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html'
})
export class CourseEditComponent implements OnInit {

  pageTitle: string;

  tabSelectedindex;

  course: Course;

  levelsOfStudies: LevelOfStudies[];

  departments: Department[];

  teachingTypes: TeachingType[];

  errorMessage: string;

  form: FormGroup;

  list: Array<Array<EmployeeRecord>> = new Array<Array<EmployeeRecord>>();

  constructor(private courseService: CourseService,
              private levelOfStudiesService: LevelOfStudiesService,
              private departmentService: DepartmentService,
              private teachingTypeService: TeachingTypeService,
              private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  static initializeCourse(): Course {
    // Return an initialized object
    return new Course();
  }

  private static mapToCourseEditFormModel(course: Course): CourseFormModel {
    return Object.assign(
      {},
      {
        name: course.name,
        espb: course.espb,
        goal: course.goal,
        methodOfEvaluation: course.methodOfEvaluation,
        levelOfStudies: course.levelOfStudies.id,
        department: course.department.id
      });
  }

  private static mapToCourseCmd(courseFormValue: CourseFormModel, course: Course): CourseCmd {
    return {
      id: course.id,
      name: courseFormValue.name,
      espb: courseFormValue.espb,
      goal: courseFormValue.goal,
      methodOfEvaluation: courseFormValue.methodOfEvaluation,
      levelOfStudiesId: courseFormValue.levelOfStudies,
      departmentId: courseFormValue.department
    };
  }

  ngOnInit() {
    this.createForm(this.fb);


    this.levelOfStudiesService.getAllLevelOfStudies().pipe(map(value => value.data)).subscribe(value => this.levelsOfStudies = value);
    this.departmentService.getAllDepartments().pipe(map(value => value.data)).subscribe(value => this.departments = value);
    this.teachingTypeService.getAllTeachingTypes().pipe(map(value => value.data)).subscribe(value => {
      this.teachingTypes = value;
      for (let i = 1; i <= this.teachingTypes.length * 2; i++) {
        this.list[i] = new Array<EmployeeRecord>();
      }
      this.employeeService.getAllEmployees().pipe(map(data => data.data)).subscribe(employees => {
        employees.map(a => {
          for (let i = 1; i <= this.teachingTypes.length * 2; i++) {
            this.list[i].push(a);
            i++;
          }
        });
      });
    });
    this.route.paramMap
      .pipe((switchMap((params: ParamMap) => {
        const isNew: boolean = this.route.snapshot.data.isNew;
        if (isNew) {
          of({data: CourseEditComponent.initializeCourse()});
        }

        // otherwise
        const courseId = Number(params.get('courseId'));
        return this.courseService.getCourseById(courseId);
      })))
      .subscribe(res => this.onRetrieved(res.data));
  }

  private createForm(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      espb: ['', Validators.required],
      goal: ['', Validators.required],
      methodOfEvaluation: ['', Validators.required],
      levelOfStudies: ['', Validators.required],
      department: ['', Validators.required]
    });

  }

  onRetrieved(course: Course) {
    if (course === null) {
      this.course = CourseEditComponent.initializeCourse();
    } else {
      this.course = course;
    }

    if (this.form) {
      this.form.reset();
    }

    // page add vs edit
    this.pageTitle = (this.course.id) ? 'COURSE.EDIT.TITLE' : 'COURSE.ADD.TITLE';

    this.form.patchValue(CourseEditComponent.mapToCourseEditFormModel(this.course));
  }

  save() {
    if (this.form.dirty && this.form.valid) {
      const obj = Object.assign(new CourseCmd(), CourseEditComponent.mapToCourseCmd(this.form.value, this.course));
      //   this.employeeService.saveEmployee(obj)
      //     .subscribe(
      //       (value) => {
      //         if (value.errors !== null && value.errors.length > 0) {
      //           this.errorMessage = value.errors[0].message;
      //         } else {
      //           this.onSaveComplete();
      //         }
      //       },
      //       (error: any) => this.errorMessage = error);
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.form.reset();
    this.router.navigate(['/domain/course/list']);
  }

  cancel() {
    this.onSaveComplete();
  }

  getList(index: number, first: boolean): EmployeeRecord[] {
    if (first) {
      return this.list[2 * index + 1];
    } else {
      return this.list[2 * index + 2];
    }
  }

}
