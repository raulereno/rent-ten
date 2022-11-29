import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from './../../redux/store/app.state';
import { Observable } from 'rxjs';
import { loadedCountries } from './../../redux/actions/location.actions';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { UploadImgService } from 'src/app/services/upload-img.service';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { LocationService } from 'src/app/services/location.service';
import {
  selectorListCountries,
  selectorListProfile,
} from 'src/app/redux/selectors/selectors';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
export interface NewHouse {
  city: string;
  country: string;
  state: string;
  rooms: number;
  bathrooms: number;
  maxpeople: number;
  allowpets: boolean;
  wifi: boolean;
  type: string;
  picture: string[];
  price: number;
}

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.scss'],

  providers: [UploadImgService],
})
export class CreateHouseComponent implements OnInit {
  //Local VariablesinitForm(): FormGroup {

  initForm(): FormGroup {
    return this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      type: ['', [Validators.required]],
      rooms: [1, [Validators.min(1), Validators.max(20), Validators.required]],
      bathrooms: [
        1,
        [Validators.min(1), Validators.max(10), Validators.required],
      ],
      maxpeople: [
        1,
        [Validators.min(1), Validators.max(50), Validators.required],
      ],
      allowPets: [false],
      wifi: [false],
      picture: [[]],
      price: [
        0,
        [Validators.min(0), Validators.max(10000), Validators.required],
      ],
    });
  }

  formNewHouse!: FormGroup;

  selectedCountry: any = { name: 'arg' };
  files: File[] = [];
  email: string = '';
  countries$: Observable<any> = new Observable();

  states$: any;
  cities$: any;
  //TODO: hacer una interface para los errores
  //ponerlo en true cuando el form este controlado
  errors: any = false;

  userProfile$: Observable<any> = new Observable();
  userProfile: any;

  constructor(
    private _uploadImg: UploadImgService,
    private _http: DataService,
    public _auth: AuthService,
    private _store: Store<AppState>,
    private _locationService: LocationService,
    private matDialog: MatDialog,
    private _location: Location,
    private router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formNewHouse = this.initForm();
    this._auth.user$.subscribe((profile) => {
      this.email = profile?.email ? profile?.email : '';
    });

    this.countries$ = this._store.select(selectorListCountries);

    this._locationService.getCountries().subscribe((response) => {
      this._store.dispatch(loadedCountries({ countries: response.data }));
    });

    /* this.userProfile$ = this._store.select(selectorListProfile)
    this.userProfile$.subscribe(res=>
      { if(res.id){
        this.userProfile= res
        console.log(this.userProfile)
        if(this.userProfile.verified !== 'verified'){
          alert('Your account must to be verification')
          // this.userProfile.unsubscribe();
          this.router.navigate(['profile']);

        }}
        else {
          this._http.getUser(this.email).subscribe(res=>{
            if(res.verified === 'verified'){
              this.router.navigate(['createhouse']);
            } else {
              alert('Your account must to be verification')
              // this.userProfile.unsubscribe();
              this.router.navigate(['profile']);

            }
          })
        }

       })
      */
  }
  get currentHouse() {
    return JSON.stringify(this.formNewHouse.value);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {};
    let dialogRef = this.matDialog.open(DialogBodyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  onSelect(event: any) {
    if (this.files.some((e) => e.name === event.addedFiles[0].name)) {
      console.log('ok');
      return;
    }
    this.files.push(...event.addedFiles);
    this.errors = false;
  }

  searchStates(country: string) {
    this._locationService.getState(country).subscribe((response) => {
      this.states$ = response.data.states;
    });
  }
  searchCities(state: string) {
    this._locationService
      .getCities(this.formNewHouse.value.country, state)
      .subscribe((response) => {
        this.cities$ = response.data;
      });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit() {
    /* if(this.userProfile.verified !== 'verified'){
      alert('Your account must to be verification')
      // this.userProfile.unsubscribe();
      this.router.navigate(['profile']); }
      else */
    this.onUpload();
    console.log(this.formNewHouse.errors);
  }

  onUpload() {
    if (!this.files[0]) {
      // alert('Enter at least one cover photo');
      Swal.fire('Enter at least one cover photo');
      return;
    }
    this.openDialog();
    console.log(this.formNewHouse.value);
    this.files.forEach((image) => {
      const data = new FormData();
      data.set('file', image);
      data.set('upload_preset', 'h4e9cy2g');
      data.set('cloud_name', 'dbgpp8nla');

      this._uploadImg.uploadImage(data).subscribe((response) => {
        this.formNewHouse.value.picture?.push(response.secure_url);
        if (this.files.length === this.formNewHouse.value.picture.length) {
          console.log(this.formNewHouse.value.picture);
          this._http.createHouse(this.formNewHouse.value, this.email);
          this.files = [];
          this.formNewHouse.reset({
            country: '',
            city: '',
            state: '',
            type: '',
            rooms: 1,
            bathrooms: 1,
            maxpeople: 1,
            allowPets: false,
            wifi: false,
            picture: [],
            price: 0,
          });
        }
      });
    });
  }

  handlePrice(price: number) {
    if (price <= 0) {
      this.formNewHouse.value.price = 0;
    }
  }
  handleType(e: string) {
    this.formNewHouse.value.type = e;
  }

  //Add and less number
  handlePLusAndMinus(operator: string, name: string) {
    switch (name) {
      case 'bathrooms':
        if (this.formNewHouse.value.bathrooms === 1 && operator === '+') {
          this.formNewHouse.value.bathrooms++;
        } else if (this.formNewHouse.value.bathrooms >= 2) {
          operator === '+'
            ? this.formNewHouse.value.bathrooms++
            : this.formNewHouse.value.bathrooms--;
        } else {
          this.formNewHouse.get('bathrooms')?.setValue(1);
        }
        break;

      case 'rooms':
        if (this.formNewHouse.value.rooms === 1 && operator === '+') {
          this.formNewHouse.value.rooms++;
        } else if (this.formNewHouse.value.rooms >= 2) {
          operator === '+'
            ? this.formNewHouse.value.rooms++
            : this.formNewHouse.value.rooms--;
        } else {
          this.formNewHouse.value.rooms = 1;
        }
        break;
      case 'maxpeople':
        if (this.formNewHouse.value.maxpeople === 1 && operator === '+') {
          this.formNewHouse.value.maxpeople++;
        } else if (this.formNewHouse.value.maxpeople >= 2) {
          operator === '+'
            ? this.formNewHouse.value.maxpeople++
            : this.formNewHouse.value.maxpeople--;
        } else {
          this.formNewHouse.value.maxpeople = 1;
        }
        break;
    }
  }
  dontLetNegative(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    console.log(value);

    switch (name) {
      case 'maxpeople':
        if (value <= 1) {
          this.formNewHouse.get('maxpeople')?.setValue(1);
        }
        break;
      case 'rooms':
        if (value <= 1) {
          this.formNewHouse.get('rooms')?.setValue(1);
        }
        break;

      case 'bathrooms':
        if (value <= 1) {
          this.formNewHouse.get('bathrooms')?.setValue(1);
        }
        break;

      default:
        break;
    }
  }
}
