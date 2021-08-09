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

@NgModule({
  declarations: [AppComponent, HomeComponent, FooterComponent, HeaderComponent, UserSearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTippyModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
