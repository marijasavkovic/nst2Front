import {serializable, serializeAll} from 'serializr';
import isoDate from '../../../util/json/bt-serializr-types';

@serializeAll
export class Employee {

  id: number;
  name: string;
  surname: string;
  personalIdentificationNumber: string;
  @serializable(isoDate())
  dateOfBirth: Date;
  @serializable(isoDate())
  dateOfEmployment: Date;
  address: string;
  title: string;
  vocation: string;

}
