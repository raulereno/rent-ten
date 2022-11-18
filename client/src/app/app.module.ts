import { HousedetailComponent } from './components/housedetail/housedetail.component';
//Modulos de Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//COMPONENTES
import { AppComponent } from './app.component';
import { HouseComponent } from './components/home/house/house.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateHouseComponent } from './components/create-house/create-house.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReviewsComponent } from './components/housedetail/reviews/reviews.component';
import { DialogBodyComponent } from './components/create-house/dialog-body/dialog-body.component';
import { PaymentComponent } from './components/housedetail/payment/payment.component';

//MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatGridListModule } from '@angular/material/grid-list';
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
//Enviroment
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment as env } from 'src/environments/environment';
import { ContainerMPComponent } from './components/housedetail/payment/container-mp/container-mp.component';







const routes: Routes = [
  {
    path: '',
    children: [
      // { path: '', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'createhouse', component: CreateHouseComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'housedetail/:id', component: HousedetailComponent },
      { path : 'place/payment',component:PaymentComponent},
      { path: "**", redirectTo: 'home' },
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
    HousedetailComponent,
    PaginatePipe,
    DialogBodyComponent,
    ReviewsComponent,
    PaymentComponent,
    ContainerMPComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot({
      ...env.auth,
    }),
    MatToolbarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    NgxDropzoneModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    CloudinaryModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    IvyCarouselModule,
    MatGridListModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent]


})
export class AppModule { }
