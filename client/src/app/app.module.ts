import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment as env } from 'src/environments/environment';
import { CreateHouseComponent } from './components/create-house/create-house.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { CommonModule } from '@angular/common';
import { HouseComponent } from './components/home/house/house.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    NavbarComponent,
    CreateHouseComponent,
    HomeComponent,
    ProfileComponent,
    HouseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'createhouse', component: CreateHouseComponent },
      { path: 'profile', component: ProfileComponent}
    ]),
    AuthModule.forRoot({
      ...env.auth,
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    NgxDropzoneModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
