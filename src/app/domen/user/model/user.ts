import {Employee} from '../../employee/model/employee';
import {object, serializable, serializeAll} from 'serializr';

@serializeAll
export class User {

  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  @serializable(object(Employee))
  employee: Employee;
}
