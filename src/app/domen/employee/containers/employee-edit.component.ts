import {Component, OnInit} from '@angular/core';
import {Employee} from '../model/employee';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {of} from 'rxjs';
import {EmployeeVocation} from '../model/employee-vocation';
import {EmployeeTitle} from '../model/employee-title';
import {EmployeeCmd} from '../model/employee-cmd';

class EmployeeFormModel {
  name: string;
  surname: string;
  personalIdentificationNumber: string;
  dateOfBirth: Date;
  dateOfEmployment: Date;
  address: string;
  title: string;
  vocation: string;
}

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {

  pageTitle: string;

  employee: Employee;

  vocationKeys = Object.keys(EmployeeVocation);
  titleKeys = Object.keys(EmployeeTitle);

  errorMessage: string;

  form: FormGroup;

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  static initializeEmployee(): Employee {
    // Return an initialized object
    return new Employee();
  }

  private static mapToEmployeeEditFormModel(employee: Employee): EmployeeFormModel {
    return Object.assign(
      {},
      {
        name: employee.name,
        surname: employee.surname,
        personalIdentificationNumber: employee.personalIdentificationNumber,
        dateOfBirth: employee.dateOfBirth,
        dateOfEmployment: employee.dateOfEmployment,
        address: employee.address,
        title: employee.title,
        vocation: employee.vocation
      });
  }

  private static mapToEmployeeCmd(employeeFormValue: EmployeeFormModel, employee: Employee): EmployeeCmd {
    return {
      id: employee.id,
      name: employeeFormValue.name,
      surname: employeeFormValue.surname,
      personalIdentificationNumber: employeeFormValue.personalIdentificationNumber,
      dateOfBirth: employeeFormValue.dateOfBirth,
      dateOfEmployment: employeeFormValue.dateOfEmployment,
      address: employeeFormValue.address,
      title: employeeFormValue.title,
      vocation: employeeFormValue.vocation
    };
  }

  ngOnInit() {
    this.createForm(this.fb);

    this.route.paramMap
      .pipe((switchMap((params: ParamMap) => {
        const isNew: boolean = this.route.snapshot.data.isNew;
        if (isNew) {
          of({data: EmployeeEditComponent.initializeEmployee()});
        }

        // otherwise
        const employeeId = Number(params.get('employeeId'));
        return this.employeeService.getEmployeeById(employeeId);
      })))
      .subscribe(res => this.onRetrieved(res.data));
  }

  private createForm(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-ZĆČĐŽŠćčšđž]+$')])],
      surname: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-ZĆČĐŽŠćčšđž]+$')])],
      personalIdentificationNumber: ['', Validators.compose([Validators.required, Validators.minLength(13),
        Validators.maxLength(13), Validators.pattern('[0-9]+')])],
      dateOfBirth: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
      address: ['', Validators.required],
      title: ['', Validators.required],
      vocation: ['', Validators.required]
    });

  }

  onRetrieved(employee: Employee) {
    if (employee === null) {
      this.employee = EmployeeEditComponent.initializeEmployee();
    } else {
      this.employee = employee;
    }

    if (this.form) {
      this.form.reset();
    }

    // page add vs edit
    this.pageTitle = (this.employee.id) ? 'EMPLOYEE.EDIT.TITLE' : 'EMPLOYEE.ADD.TITLE';

    this.form.patchValue(EmployeeEditComponent.mapToEmployeeEditFormModel(this.employee));
  }

  save() {
    if (this.form.dirty && this.form.valid) {
      const obj = Object.assign(new EmployeeCmd(), EmployeeEditComponent.mapToEmployeeCmd(this.form.value, this.employee));
      this.employeeService.saveEmployee(obj)
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
    this.router.navigate(['/domain/employee/list']);
  }

  cancel() {
    this.onSaveComplete();
  }

  getVocationValue(key: string): string {
    return EmployeeVocation[key];
  }

  getTitleValue(key: string): string {
    return EmployeeTitle[key];
  }
}
