import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {deserialize} from 'serializr';
import {DepartmentListResponse} from '../model/department-response';


@Injectable()
export class DepartmentService {

  protected baseUrl = `${environment}/application/department`;

  constructor(private http: HttpClient) {
  }

  getAllDepartments(): Observable<DepartmentListResponse> {
    const url = `${this.baseUrl}/findAllDepartments`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(DepartmentListResponse, resJsonBody)),
        tap(data => console.log('------ ' + data.data))
      );
  }
}
