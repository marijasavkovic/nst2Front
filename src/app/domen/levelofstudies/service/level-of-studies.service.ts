import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/internal/operators';
import {CourseListResponse} from '../../course/model/course-response';
import {HttpClient} from '@angular/common/http';
import {deserialize} from 'serializr';
import {LevelOfStudiesListResponse} from '../model/level-of-studies-response';

@Injectable()
export class LevelOfStudiesService {

  protected baseUrl = `${environment}/application/levelOfStudies`;

  constructor(private http: HttpClient) {
  }

  getAllLevelOfStudies(): Observable<LevelOfStudiesListResponse> {
    const url = `${this.baseUrl}/findAllLevelsOfStudies`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(LevelOfStudiesListResponse, resJsonBody)),
        tap(data => console.log('------ ' + data.data))
      );
  }
}
