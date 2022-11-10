//Modulos de Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
//COMPONENTES
import { AppComponent } from './app.component';
import { HouseComponent } from './components/home/house/house.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateHouseComponent } from './components/create-house/create-house.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
//MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
//ROUTING
import { RouterModule, Routes } from '@angular/router';
//AUTH0
import { AuthModule } from '@auth0/auth0-angular';
//CLOUDINARY
import { CloudinaryModule } from '@cloudinary/ng';
//DROP-ZONE
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PaginatePipe } from './pipes/paginate.pipe';
//NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './redux/store/app.state';
//Enviroment
import { environment } from '../environments/environment'
import { environment as env } from 'src/environments/environment';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'createhouse', component: CreateHouseComponent },
      {path:  'profile',component:ProfileComponent },
      { path: "**", redirectTo: 'home' },
      { path: 'housedetail/:id', component: HousedetailComponent},
    ]
  }
];

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
    PaginatePipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot({
      ...env.auth,
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    NgxDropzoneModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CloudinaryModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
