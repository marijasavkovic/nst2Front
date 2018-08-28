import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {CourseService} from '../service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  providers: []
})
export class CourseListComponent implements OnInit{

  errorMessage: string;

  rows = [];

  constructor(private courseService: CourseService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().pipe(map(value => value.data)).subscribe(value => this.rows = value);
  }

  delete(id: string) {
    this.courseService.deleteCourse(id).subscribe(
      value => {
        if (value.errors !== null && value.errors.length > 0) {
          this.errorMessage = value.errors[0].message;
        } else if (value.message !== null) {
          this.navigateToList();
        }
      },
      error2 => this.errorMessage = error2
    );
  }

  edit(id: string) {
    this.router.navigate(['/domain/course/edit', id]);
  }

  private navigateToList(): void {
    location.reload();
  }

  onSelect(id: string) {
    this.router.navigate(['/domain/course/view', id]);
  }
}
