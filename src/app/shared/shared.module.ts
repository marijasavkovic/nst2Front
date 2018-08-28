import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {MomentModule} from 'angular2-moment';
import {BsDatepickerModule, TabsModule} from 'ngx-bootstrap';
import {TreeviewModule} from 'ngx-treeview';
import {PickListModule} from 'primeng/primeng';

const vendorModules = [
  TranslateModule,
  MomentModule,
  BsDatepickerModule,
  TreeviewModule,
  TabsModule,
  PickListModule
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
