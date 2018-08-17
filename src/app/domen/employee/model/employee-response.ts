import {EmployeeRecord} from './employee-record';
import {list, object, serializable} from 'serializr';

export class EmployeeResponse {

  @serializable(list(object(EmployeeRecord)))
  data: Array<EmployeeRecord>;
}
