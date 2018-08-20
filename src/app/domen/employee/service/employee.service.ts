import {EmployeeResponse} from '../model/employee-response';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {deserialize} from 'serializr';
import {map, tap} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';


@Injectable()
export class EmployeeService {

  protected baseUrl = `${environment}/application/employee`;

  constructor(private http: HttpClient) {
  }

  getAllEmployees(): Observable<EmployeeResponse> {
    const url = `${this.baseUrl}/findAllEmployees`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(EmployeeResponse, resJsonBody)),
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
}
