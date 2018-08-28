import * as moment from 'moment';
import {DateConstants} from '../date/date-constants';

export default function isoDate(): any {
  return {
    serializer: function (value: any): any {
      if (value === null || value === undefined) {
        return value;
      }
      if (!(value instanceof Date)) {
        const niz = value.toString().split('/');
        value = new Date(niz[2], niz[1] - 1, niz[0]);
      }

      return value;
    },
    deserializer: function (jsonValue: any, done: Function): any {
      if (jsonValue === null || jsonValue === undefined) {
        return void done(null, jsonValue);
      }

      const m = moment(new Date(jsonValue)).format(DateConstants.LOCAL_DATE_FORMAT);

      return void done(null, m);
    }
  };
}
