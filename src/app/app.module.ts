import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/pages/home/home.component';
import { FooterComponent } from './main/shared/components/footer/footer.component';
import { HeaderComponent } from './main/shared/components/header/header.component';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchComponent } from './main/shared/components/user-search/user-search.component';
import { UserComponent } from './main/pages/user/user.component';
import { MainStatsComponent } from './main/pages/user/main-stats/main-stats.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './main/pages/user/charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { ReposComponent } from './main/pages/user/repos/repos.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { RepoCardComponent } from './main/pages/user/repos/repo-card/repo-card.component';
import { ScrollToTopComponent } from './main/shared/components/scroll-to-top/scroll-to-top.component';
import { UserNotFoundComponent } from './main/pages/user-not-found/user-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    UserSearchComponent,
    UserComponent,
    MainStatsComponent,
    ChartsComponent,
    ReposComponent,
    RepoCardComponent,
    ScrollToTopComponent,
    UserNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTippyModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    JwPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
