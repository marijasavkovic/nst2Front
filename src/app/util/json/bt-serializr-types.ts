import * as moment from 'moment';
import {DateConstants} from '../date/date-constants';

export default function isoDate(): any {
  return {
    serializer: function(value: any): any {
      if (value === null || value === undefined) {
        return value;
      }
      if (!(value instanceof Date)) {
        throw new Error('[serializr] Expected Date object');
      }

      const m = moment(value, [DateConstants.LOCAL_DATE_FORMAT, DateConstants.ISO_DATE_FORMAT], true);
      return m.isValid() ? m.format(DateConstants.ISO_DATE_FORMAT) : null;
    },
    deserializer: function(jsonValue: any, done: Function): any {
      if (jsonValue === null || jsonValue === undefined) {
        return void done(null, jsonValue);
      }

      const m = moment(jsonValue, [DateConstants.ISO_DATE_FORMAT, DateConstants.LOCAL_DATE_FORMAT], true);
      const date = m.isValid() ? m.toDate() : null;
      return void done(null, date);
    }
  };
}
