import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe((switchMap ((params: ParamMap) => {
        const userId = Number(params.get('userId'));
        return this.userService.getUserById(userId);
      })))
      .subscribe(user => this.user = user.data);
  }

  goToBack() {
    this.location.back();
  }

  goToEdit() {
    this.router.navigate(['/domain/user/edit', this.user.id]);
  }
}
