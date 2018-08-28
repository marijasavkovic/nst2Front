import {EmployeeRecord} from './employee-record';
import {list, object, serializable} from 'serializr';
import {Employee} from './employee';
import {Error} from '../../../shared/error/error';

export class EmployeeListResponse {

  @serializable(list(object(EmployeeRecord)))
  data: Array<EmployeeRecord>;
}

export class EmployeeResponse {

  @serializable(object(Employee))
  data: Employee;

  @serializable(list(object(Error)))
  errors?: Array<Error>;

  message?: string;

  status: string;

}
