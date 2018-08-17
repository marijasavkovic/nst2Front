import {NgModule, Type} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DomainModule} from './domen/domain.module';
import {DashboardModule} from './dashboard';
import {AppContentComponent} from './layout/content.component';
import {PageNotFoundComponent} from './layout/page-not-found.component';

export function dashboardModuleRef(): Type<any> {
  return DashboardModule;
}

export function domainModuleRef(): Type<any> {
  return DomainModule;
}

export const routes: Routes = [
  // send to dashboard by default
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {path: 'dashboard', component: AppContentComponent, loadChildren: dashboardModuleRef},
  {path: 'domain', component: AppContentComponent, loadChildren: domainModuleRef},

  // catch all for unmatched uris (404 page)
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRootRoutingModule {
}
