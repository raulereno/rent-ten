import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
    ]),
    AuthModule.forRoot({
      domain: "dev-fw4pifkr3xl3w7w3.us.auth0.com",
      clientId: "olX2EyfVrVWLZzLLvwOYRBtDu65R35hO"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
