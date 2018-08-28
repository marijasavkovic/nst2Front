import {Injectable} from '@angular/core';
import {deserialize} from 'serializr';
import {map, tap} from 'rxjs/internal/operators';
import {environment} from '../../../environment/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CourseListResponse, CourseResponse} from '../model/course-response';


@Injectable()
export class CourseService{

  protected baseUrl = `${environment}/application/course`;

  constructor(private http: HttpClient) {
  }

  getAllCourses(): Observable<CourseListResponse> {
    const url = `${this.baseUrl}/findAllCourses`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(CourseListResponse, resJsonBody)),
        tap(data => console.log('------ ' + data.data))
      );
  }

  deleteCourse(courseId: string): Observable<any> {
    const url = `${this.baseUrl}/${courseId}`;
    return this.http.delete(url)
      .pipe(
        tap(data => console.log('***** ' + data))
      );
  }

  getCourseById(courseId: number): Observable<CourseResponse> {
    const url = `${this.baseUrl}/${courseId}`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(CourseResponse, resJsonBody)),
        tap(data => console.log('*****' + data.data))
      );
  }
}
