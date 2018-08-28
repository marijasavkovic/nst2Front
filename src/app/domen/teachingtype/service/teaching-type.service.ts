import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {deserialize} from 'serializr';
import {TeachingTypeListResponse} from '../model/teaching-type-response';

@Injectable()
export class TeachingTypeService {

  protected baseUrl = `${environment}/application/teachingType`;

  constructor(private http: HttpClient) {
  }

  getAllTeachingTypes(): Observable<TeachingTypeListResponse> {
    const url = `${this.baseUrl}/findAllTeachingTypes`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(TeachingTypeListResponse, resJsonBody)),
        tap(data => console.log('------ ' + data.data))
      );
  }}
