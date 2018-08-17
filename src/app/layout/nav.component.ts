import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  navOpen = false;

  constructor() {
  }

  // logout(): void {
  //   this.authenticationService.logout()
  //     .subscribe(
  //       () => this.router.navigate(['/login']),
  //       error => this.logger.log(error)
  //     );
  // }
}
