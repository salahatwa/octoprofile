import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/pages/home/home.component';
import { FooterComponent } from './main/shared/components/footer/footer.component';
import { HeaderComponent } from './main/shared/components/header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, FooterComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
