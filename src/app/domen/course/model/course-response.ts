import {list, object, serializable} from 'serializr';
import {CourseRecord} from './course-record';
import {Course} from './course';
import {Error} from '../../../shared/error/error';

export class CourseListResponse {

  @serializable(list(object(CourseRecord)))
  data: Array<CourseRecord>;
}

export class CourseResponse {

  @serializable(object(Course))
  data: Course;

  @serializable(list(object(Error)))
  errors?: Array<Error>;

  message?: string;

  status: string;

}
