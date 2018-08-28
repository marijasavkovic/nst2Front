import {serializeAll} from 'serializr';

@serializeAll
export class CourseRecord {
   id: number;
   name: string;
   espb: number;
   levelOfStudiesName: string;
   departmentName: string;
}
