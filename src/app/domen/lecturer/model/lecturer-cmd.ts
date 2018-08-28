import {serializeAll} from 'serializr';

@serializeAll
export class LecturerCmd {

  id: number;
  teachingTypeId: number;
  employeeId: number;
}
