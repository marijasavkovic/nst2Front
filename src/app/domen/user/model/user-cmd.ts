import {object, serializable, serializeAll} from 'serializr';
import {Employee} from '../../employee/model/employee';
@serializeAll
export class UserCmd {

  id?: number;
  username?: string;
  password: string;
  email: string;
  role: string;
  employeeId?: number;

}
