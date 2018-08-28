import {Component, OnInit, ViewChild} from '@angular/core';
import {map, switchMap} from 'rxjs/internal/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {of} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {UserCmd} from '../model/user-cmd';
import {UserRole} from '../model/user-role';
import {EmployeeService} from '../../employee/service/employee.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';

class UserFormModel {
  username: string;
  password: string;
  email: string;
  role: string;
  employeeId: number;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  pageTitle: string;

  user: User;

  roleKeys = Object.keys(UserRole);

  errorMessage: string;

  form: FormGroup;

  temp = [];

  employeeId: number;

  add: boolean;
  edit: boolean;

  columns = [
    {prop: 'name'},
    {name: 'Surname'},
    {name: 'Title'},
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  rows = [];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private employeeService: EmployeeService) {
  }

  static initializeUser(): User {
    return new User();
  }

  private static mapToUserEditFormModel(user: User): UserFormModel {
    return Object.assign(
      {},
      {
        username: user.username,
        password: user.password,
        email: user.email,
        role: user.role,
        employeeId: user.employee !== null ? user.employee.id : 0
      })
      ;
  }

  private static mapToUserCmd(userFormModel: UserFormModel, user: User, employeeId: number): UserCmd {
    return {
      id: user.id,
      username: userFormModel.username,
      password: userFormModel.password,
      email: userFormModel.email,
      role: userFormModel.role,
      employeeId: userFormModel.employeeId
    };
  }

  ngOnInit() {
    this.createForm(this.fb);
    this.employeeService.getAllEmployees().pipe(map(value => value.data)).subscribe(value => {
      this.rows = value;
      this.temp = value;
    });
    this.route.paramMap
      .pipe((switchMap((params: ParamMap) => {
        const isNew: boolean = this.route.snapshot.data.isNew;
        if (isNew) {
          of({data: UserEditComponent.initializeUser()});
        }

        // otherwise
        const userId = Number(params.get('userId'));
        return this.userService.getUserById(userId);
      })))
      .subscribe(res => this.onRetrieved(res.data));
  }

  private createForm(fb: FormBuilder) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required])],
      role: ['', Validators.required],
      employeeId: ['', Validators.required]
    });

  }

  onRetrieved(user: User) {
    if (user === null) {
      this.user = UserEditComponent.initializeUser();
      this.edit = false;
      this.add = true;
    } else {
      this.edit = true;
      this.add = false;
      this.user = user;
    }

    if (this.form) {
      this.form.reset();
    }

    // page add vs edit
    this.pageTitle = (this.user.id) ? 'USER.EDIT.TITLE' : 'USER.ADD.TITLE';

    this.form.patchValue(UserEditComponent.mapToUserEditFormModel(this.user));
  }

  save() {
    if (this.form.dirty && this.form.valid) {
      const obj = Object.assign(new UserCmd(), UserEditComponent.mapToUserCmd(this.form.value, this.user, this.employeeId));
      this.userService.saveUser(obj)
        .subscribe(
          (value) => {
            if (value.errors !== null && value.errors.length > 0) {
              this.errorMessage = value.errors[0].message;
            } else {
              this.onSaveComplete();
            }
          },
          (error: any) => this.errorMessage = error);
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.form.reset();
    this.router.navigate(['/domain/user/list']);
  }

  cancel() {
    this.onSaveComplete();
  }

  getRoleValue(key: string): string {
    return UserRole[key];
  }

  onSelect({selected}) {
    if (!this.form.dirty) {
      this.form.markAsDirty();
    }
    this.employeeId = selected[0].id;
    this.form.patchValue({
      employeeId: selected[0].id
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || d.surname.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  cancelEditing() {
    this.edit = true;
    this.employeeId = this.user.employee.id;
    this.form.patchValue({
      employeeId: this.user.employee.id
    });
  }

}
