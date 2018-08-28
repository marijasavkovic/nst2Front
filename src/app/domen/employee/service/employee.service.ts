import {EmployeeListResponse, EmployeeResponse} from '../model/employee-response';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {deserialize, getDefaultModelSchema, serialize} from 'serializr';
import {map, tap} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';
import {EmployeeCmd} from '../model/employee-cmd';
import * as R from 'ramda';


@Injectable()
export class EmployeeService {

  protected baseUrl = `${environment}/application/employee`;

  constructor(private http: HttpClient) {
  }

  getAllEmployees(): Observable<EmployeeListResponse> {
    const url = `${this.baseUrl}/findAllEmployees`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(EmployeeListResponse, resJsonBody)),
        tap(data => console.log('------ ' + data.data))
      );
  }

  deleteEmployee(employeeId: string): Observable<any> {
    const url = `${this.baseUrl}/${employeeId}`;
    return this.http.delete(url)
      .pipe(
        tap(data => console.log('***** ' + data))
      );
  }

  getEmployeeById(employeeId: number): Observable<EmployeeResponse> {
    const url = `${this.baseUrl}/${employeeId}`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(EmployeeResponse, resJsonBody)),
        tap(data => console.log('*****' + data.data))
      );
  }

  saveEmployee(employee: EmployeeCmd): Observable<EmployeeResponse> {
    if (R.isNil(employee.id)) {
      return this.createEmployee(employee);
    } else {
      return this.updateEmployee(employee);
    }
  }

  private createEmployee(employee: EmployeeCmd): Observable<EmployeeResponse> {
    const url = `${this.baseUrl}`;

    const reqJsonBody = serialize(getDefaultModelSchema(EmployeeCmd), employee);
    return this.http.post(url, reqJsonBody)
      .pipe(
        map(resJsonBody => deserialize(EmployeeResponse, resJsonBody)),
        tap(body => console.log('------ ' + body.data))
      );
  }

  private updateEmployee(employee: EmployeeCmd): Observable<EmployeeResponse> {
    const url = `${this.baseUrl}/${employee.id}`;

    const reqJsonBody = serialize(getDefaultModelSchema(EmployeeCmd), employee);
    return this.http.put(url, reqJsonBody)
      .pipe(
        map(resJsonBody => deserialize(EmployeeResponse, resJsonBody)),
        tap(body => console.log('------ ' + body))
      );
  }

}
