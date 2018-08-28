import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <app-nav></app-nav>
    <div class="container-fluid">
      <div class="card o-layout--main">
        <div class="card-body scroll">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class AppContentComponent {
}
