import {list, object, serializable, serializeAll} from 'serializr';
import {LecturerCmd} from '../../lecturer/model/lecturer-cmd';

@serializeAll
export class CourseCmd {

  id?: number;
  name: string;
  espb: number;
  goal: string;
  methodOfEvaluation: string;
  levelOfStudiesId: number;
  departmentId: number;
  // @serializable(list(object(LecturerCmd)))
  // lecturerList: Array<LecturerCmd>;

}
