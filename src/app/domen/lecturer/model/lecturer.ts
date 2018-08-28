import {object, serializable, serializeAll} from 'serializr';
import {Employee} from '../../employee/model/employee';
import {TeachingType} from '../../teachingtype/model/teaching-type';

@serializeAll
export class Lecturer {

  id: number;
  @serializable(object(TeachingType))
  teachingType: TeachingType;
  @serializable(object(Employee))
  employee: Employee;
}
