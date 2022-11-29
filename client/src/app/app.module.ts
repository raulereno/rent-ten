//Modulos de Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
import { environment as env } from 'src/environments/environment';
import { ChatComponent } from './components/chat/chat.component';
import { TableUserAComponent } from './components/dashboard/table-user-a/table-user-a.component';
import { TableUserDComponent } from './components/dashboard/table-user-d/table-user-d.component';
import { TableHouseAComponent } from './components/dashboard/table-house-a/table-house-a.component';
import { TableHouseDComponent } from './components/dashboard/table-house-d/table-house-d.component';
import { AlternativehouseComponent } from './components/home/alternativehome/alternativehouse/alternativehouse.component';
import { SliderComponent } from './components/home/alternativehome/slider/slider.component';
import { AlternativehomeComponent } from './components/home/alternativehome/alternativehome.component';
import { StatusComponent } from './components/housedetail/status/status.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HousedetailComponent } from './components/housedetail/housedetail.component';
//GALERIA
import { GalleryDirective } from './components/housedetail/gallery.directive';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
//BOOTSTRAP
import { NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
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
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
//COOKIES
import { CookieService } from 'ngx-cookie-service';
import { SocketIoModule } from 'ngx-socket-io';
import { FooterComponent } from './components/footer/footer.component';

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
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/housesA', component: TableHouseAComponent },
      { path: 'dashboard/housesD', component: TableHouseDComponent },
      { path: 'dashboard/usersA', component: TableUserAComponent },
      { path: 'dashboard/usersD', component: TableUserDComponent },
      {
        path: 'housedetail/mercadopago/:id/:houseId/:code',
        component: StatusComponent,
      },
      { path: 'chat', component: ChatComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
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
    AlternativehomeComponent,
    StatusComponent,
    GalleryDirective,
    DashboardComponent,
    ChatComponent,
    TableUserAComponent,
    TableUserDComponent,
    TableHouseAComponent,
    TableHouseDComponent,
    AlternativehouseComponent,
    SliderComponent,
    FooterComponent,
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
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    NgbModule,
    GalleryModule,
    NgbAccordionModule,
    SocketIoModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent],
})
export class AppModule {}
