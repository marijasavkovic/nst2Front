import {serializable, serializeAll} from 'serializr';
import isoDate from '../../../util/json/bt-serializr-types';

@serializeAll
export class EmployeeRecord {

  id: number;
  name: string;
  surname: string;
  personalIdentificationNumber: string;
  @serializable(isoDate())
  dateOfEmployment: Date;
  title: string;
  vocation: string;

}
