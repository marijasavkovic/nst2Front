import {LevelOfStudies} from '../../levelofstudies/model/level-of-studies';
import {Department} from '../../department/model/department';
import {list, object, serializable, serializeAll} from 'serializr';
import {Lecturer} from '../../lecturer/model/lecturer';
import {ThematicUnit} from '../../tematicunit/model/thematic-unit';

@serializeAll
export class Course {

  id: number;
  name: string;
  espb: number;
  goal: string;
  methodOfEvaluation: string;
  @serializable(object(LevelOfStudies))
  levelOfStudies: LevelOfStudies;
  @serializable(object(Department))
  department: Department;
  @serializable(list(object(Lecturer)))
  lecturerList: Array<Lecturer>;
  @serializable(list(object(ThematicUnit)))
  thematicUnitsList: Array<ThematicUnit>;
}
