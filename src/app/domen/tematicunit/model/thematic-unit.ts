import {object, serializable, serializeAll} from 'serializr';
import {TeachingType} from '../../teachingtype/model/teaching-type';

@serializeAll
export class ThematicUnit {
  id: number;
  name: string;
  serialNumber: string;
  description: string;
  @serializable(object(ThematicUnit))
  parentThematicUnit: ThematicUnit;
}
