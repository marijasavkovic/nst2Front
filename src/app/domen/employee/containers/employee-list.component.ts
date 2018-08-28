import {EmployeeService} from '../service/employee.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  providers: []
})
export class EmployeeListComponent implements OnInit {

  errorMessage: string;

  rows = [];

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().pipe(map(value => value.data)).subscribe(value => this.rows = value);
  }

  delete(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(
      value => {
        if (value.errors !== null && value.errors.length > 0) {
          this.errorMessage = value.errors[0].message;
        } else if (value.message !== null) {
          this.navigateToList();
        }
      },
      error2 => this.errorMessage = error2
    );
  }

  edit(id: string) {
    this.router.navigate(['/domain/employee/edit', id]);
  }

  private navigateToList(): void {
    location.reload();
  }

  onSelect(id: string) {
    this.router.navigate(['/domain/employee/view', id]);
  }
}
