import {list, object, serializable} from 'serializr';
import {Department} from './department';

export class DepartmentListResponse {

  @serializable(list(object(Department)))
  data: Array<Department>;
}
