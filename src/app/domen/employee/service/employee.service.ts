import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeResponse} from '../model/employee-response';
import {deserialize} from 'serializr';
import {map, tap} from 'rxjs/internal/operators';
import {log} from 'util';


@Injectable()
export class EmployeeService {

  protected baseUrl = `/application/employee`;

  constructor(private http: HttpClient) {
  }

  getAllEmployees(): Observable<EmployeeResponse> {
    const url = `${this.baseUrl}/findAllEmployees`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(EmployeeResponse, resJsonBody)),
        tap(data => log('****** ' + data))
      );
  }
}
