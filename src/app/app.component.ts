import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
}
