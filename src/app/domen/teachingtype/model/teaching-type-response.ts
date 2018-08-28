import {list, object, serializable} from 'serializr';
import {TeachingType} from './teaching-type';


export class TeachingTypeListResponse {

  @serializable(list(object(TeachingType)))
  data: Array<TeachingType>;

}
