import {list, object, serializable} from 'serializr';
import {LevelOfStudies} from './level-of-studies';

export class LevelOfStudiesListResponse {

  @serializable(list(object(LevelOfStudies)))
  data: Array<LevelOfStudies>;
}
