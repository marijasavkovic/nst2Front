import {Component, OnInit} from '@angular/core';
import {Employee} from '../model/employee';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html'
})
export class EmployeeViewComponent implements OnInit {

  employee: Employee;

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe((switchMap ((params: ParamMap) => {
        const employeeId = Number(params.get('employeeId'));
        return this.employeeService.getEmployeeById(employeeId);
      })))
      .subscribe(employee => this.employee = employee.data);
  }

  goToBack() {
    this.location.back();
  }

  goToEdit() {
    this.router.navigate(['/domain/employee/edit', this.employee.id]);
  }

}
