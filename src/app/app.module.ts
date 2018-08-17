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

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const externalModules = [
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,

  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
  }),
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
