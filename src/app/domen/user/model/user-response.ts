import {list, object, serializable} from 'serializr';
import {UserRecord} from './user-record';
import {User} from './user';
import {Error} from '../../../shared/error/error';

export class UserListResponse {

  @serializable(list(object(UserRecord)))
  data: Array<UserRecord>;
}

export class UserResponse {

  @serializable(object(User))
  data: User;

  @serializable(list(object(Error)))
  errors?: Array<Error>;

  message?: string;

  status: string;

}
