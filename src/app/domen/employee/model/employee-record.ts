import {serializeAll} from 'serializr';

@serializeAll
export class EmployeeRecord {

  id: number;
  name: string;
  surname: string;
  personalIdentificationNumber: string;
  title: string;
  vocation: string;

}
