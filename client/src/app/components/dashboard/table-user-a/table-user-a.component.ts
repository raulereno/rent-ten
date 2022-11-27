import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeAuthorizedUser, loadProfile } from 'src/app/redux/actions/location.actions';
import { Observable, pipe } from 'rxjs';
import { selectorListProfile } from 'src/app/redux/selectors/selectors';
import { userProfile } from 'src/app/models/UserProfile';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { AdmindashboardService } from 'src/app/services/admindashboard.service';


@Component({
  selector: 'app-table-user-a',
  templateUrl: './table-user-a.component.html',
  styleUrls: ['./table-user-a.component.css']
})
export class TableUserAComponent implements OnInit {

  userProfile$: Observable<any> = new Observable();
  public userProfile: userProfile;


  constructor(
    private store: Store<any>,
    public http: DataServiceService,
    public auth: AuthService,
    private router: Router,
    private _admindashboard: AdmindashboardService,

  ) { }
  profileJson: any;

  public users: any[];

  id: string;

  customChangeAutorized: string


  ngOnInit(): void {

    console.log(" 1 - Inicio OnInint")

    this.userProfile$ = this.store.select(selectorListProfile);
    console.log(" 2 - Pasa por el Profile")

    this.desactiveAccount(this.id);
    console.log(" 3 - Pasa por el desactiveAcount This.id")





  }



  loadProfile(): void {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = profile;
      this.http.getUser(this.profileJson.email).subscribe((res) => {
        this.store.dispatch(loadProfile({ userProfile: res }));
        this.userProfile$.subscribe((res) => {
          this.userProfile = res;
        });
      });

      this.http.updateUser(this.profileJson.email, this.profileJson.sub);
    });
  }

  getUsers() {
    this.http.getUsers().subscribe(res => this.users = res)
  }

  back() { this.router.navigate(['dashboard']) }

  showInfo() {
    console.log(this.users)
  }

  desactiveAccount(id: string) {

    console.log("----- Inicio Desactive Account")

    this.id = id
    this.http.deleteAccount(this.id, 'not')
    this.store.dispatch(changeAuthorizedUser({ payload: 'not' }));
    this._admindashboard.changeModeAutorized('not')
    // this.getUsers()
    console.log(" -- Ejecuto el getUser dentro del Acount")

    console.log("----- Fin Desactive Account")

    this._admindashboard.customChangeAutorized.subscribe((res: string) => {
      this.customChangeAutorized = res
      if (this.customChangeAutorized === "all") {
        console.log(" 4 - Entra al if CustomChange = all")
        this.getUsers()
        this.loadProfile();

      }
    })

    this.getUsers()
  }

  // deleteAccount(userId: string) {
  //   if (confirm('Are you sure you want delete your account?')) {
  //     this.store.dispatch(changeAuthorizedUser({ payload: 'not' }));
  //     this.http.deleteAccount(userId, 'not');
  //     this.auth.logout();
  //     this._router.navigate(['home']);
  //   }
  // }

}