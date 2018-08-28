import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers: []
})
export class UserListComponent implements OnInit {

  errorMessage: string;

  rows = [];

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().pipe(map(value => value.data)).subscribe(value => this.rows = value);
  }

  delete(id: string) {
    this.userService.deleteUser(id).subscribe(
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
    this.router.navigate(['/domain/user/edit', id]);
  }

  private navigateToList(): void {
    location.reload();
  }

  onSelect(id: string) {
    this.router.navigate(['/domain/user/view', id]);
  }
}
