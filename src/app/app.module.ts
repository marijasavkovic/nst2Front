import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRootRoutingModule} from './app-routing.module';
import {NavComponent} from './layout/nav.component';
import {FooterComponent} from './layout/footer.component';
import {AppContentComponent} from './layout/content.component';
import {PageNotFoundComponent} from './layout/page-not-found.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BsDatepickerModule, TabsModule} from 'ngx-bootstrap';
import {TreeviewModule} from 'ngx-treeview';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {PickListModule} from 'primeng/primeng';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const externalModules = [
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  NoopAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  PickListModule,

  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
  }),
  BsDatepickerModule.forRoot(),
  TreeviewModule.forRoot(),
  TabsModule.forRoot()
];

const appModules = [
];

const routingModules = [
  AppRootRoutingModule
];

const appRootComponents = [
  AppComponent,
  NavComponent,
  FooterComponent,
  AppContentComponent,
  PageNotFoundComponent
];

@NgModule({
  imports: [
    ...externalModules,
    ...appModules,
    ...routingModules
  ],
  declarations: [
    ...appRootComponents
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
