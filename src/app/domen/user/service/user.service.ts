import {deserialize, getDefaultModelSchema, serialize} from 'serializr';
import {map, tap} from 'rxjs/internal/operators';
import {environment} from '../../../environment/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserListResponse, UserResponse} from '../model/user-response';
import {Injectable} from '@angular/core';
import * as R from 'ramda';
import {UserCmd} from '../model/user-cmd';

@Injectable()
export class UserService {

  protected baseUrl = `${environment}/application/user`;

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UserListResponse> {
    const url = `${this.baseUrl}/findAllUsers`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(UserListResponse, resJsonBody)),
        tap(data => console.log('------ ' + data.data))
      );
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete(url)
      .pipe(
        tap(data => console.log('***** ' + data))
      );
  }

  getUserById(userId: number): Observable<UserResponse> {
    const url = `${this.baseUrl}/${userId}`;

    return this.http.get(url)
      .pipe(
        map(resJsonBody => deserialize(UserResponse, resJsonBody)),
        tap(data => console.log('*****' + data.data))
      );
  }

  saveUser(user: UserCmd): Observable<UserResponse> {
    if (R.isNil(user.id)) {
      return this.createUser(user);
    } else {
      return this.updateUser(user);
    }
  }

  private createUser(user: UserCmd): Observable<UserResponse> {
    const url = `${this.baseUrl}`;

    const reqJsonBody = serialize(getDefaultModelSchema(UserCmd), user);
    return this.http.post(url, reqJsonBody)
      .pipe(
        map(resJsonBody => deserialize(UserResponse, resJsonBody)),
        tap(body => console.log('------ ' + body))
      );
  }

  private updateUser(user: UserCmd): Observable<UserResponse> {
    const url = `${this.baseUrl}/${user.id}`;

    const reqJsonBody = serialize(getDefaultModelSchema(UserCmd), user);
    return this.http.put(url, reqJsonBody)
      .pipe(
        map(resJsonBody => deserialize(UserResponse, resJsonBody)),
        tap(body => console.log('------ ' + body))
      );
  }
}
