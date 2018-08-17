import {Component, OnInit} from '@angular/core';
import {EmployeeRecord} from '../model/employee-record';
import {EmployeeService} from '../service/employee.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  providers: []
})
export class EmployeeListComponent {

  // errorMessage: string;
  //
  // employeeList: Array<EmployeeRecord> = [];
  //
  // rows = [];
  //
  // columns = [
  //   { name: 'Company' },
  //   { name: 'Name' },
  //   { name: 'Gender' }
  // ];
  //
  // constructor(private employeeService: EmployeeService,
  //             private router: Router,
  //             private fb: FormBuilder) {
  // }
  //
  // ngOnInit(): void {
  // }.

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

}
