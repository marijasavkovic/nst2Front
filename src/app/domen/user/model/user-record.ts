import {serializeAll} from 'serializr';

@serializeAll
export class UserRecord {

   id: number;
   username: string;
   email: string;
   role: string;
   employeeName: string;
   employeeSurname: string;
}
