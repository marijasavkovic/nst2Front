import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {MomentModule} from 'angular2-moment';

const vendorModules = [
  TranslateModule,
  MomentModule
];

const sharedModules = [
];

@NgModule({
  imports: [
    CommonModule,
    ...vendorModules,
    ...sharedModules
  ],
  declarations: [
  ],
  exports: [
    ...vendorModules,
    ...sharedModules
  ],
  providers: [] // This is a shared module: it must not have any providers
})
export class SharedModule {
}
