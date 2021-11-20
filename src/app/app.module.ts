import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserComponent } from './pages/user/user.component';
import { MainStatsComponent } from './pages/user/main-stats/main-stats.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './pages/user/charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { ReposComponent } from './pages/user/repos/repos.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { RepoCardComponent } from './pages/user/repos/repo-card/repo-card.component';
import { UserNotFoundComponent } from './pages/user-not-found/user-not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

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
    UserNotFoundComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    JwPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
