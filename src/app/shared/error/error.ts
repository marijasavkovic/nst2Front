import {serializeAll} from 'serializr';

@serializeAll
export class Error {
  message: string;
}
