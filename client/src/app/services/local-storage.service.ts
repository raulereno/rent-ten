import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { House } from '../models/House';

const MY_FAVORITES : string = 'myFavorites';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
//private favoritesHousesSubj = new BehaviorSubject<House[]>(null!); // recuperar la data y ponerla en un observarble y debe tener un valor por defecto que es null
//favoritesHouses$ = this.favoritesHousesSubj.asObservable() // signo pesos porque nos devuelve un observarble

  constructor() { 
    this.initialStorage(MY_FAVORITES, localStorage)
  }

/* 
  addOrRemoveFavorite(house:House): void{
    const {id}=house;
    const currentFav = this.getFavoritesHouses()  // recuperamos los elementos guardados en storag
    const found = !!currentFav.find( (fav: House) => fav.id === id);
    found ? this.removeFavorite(id) : this.addToFavorite(id)
  } */

   addToFavorite(id:string): void{
    try {
      const currentFav = this.getFavoritesHouses();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentFav, id]))
      //this.favoritesHousesSubj.next([...currentFav, id])
    } catch (error) {
        console.log('error in addFavorite', error)
    }
  }

   removeFavorite(id:string):void{
    try {
      const currentFav = this.getFavoritesHouses();
      console.log('1',currentFav)
      for (let i = 0; i < currentFav.length; i++) 
      { if (id === currentFav[i]) {  console.log('id', id)
        currentFav.splice(i, 1); localStorage.setItem(MY_FAVORITES, JSON.stringify(currentFav)); } }

      console.log('2',currentFav)
     /* const houses = currentFav.filter((item:string)=>{console.log('2',item)
        item !== id})
      console.log('3', houses) */
      //localStorage.setItem(MY_FAVORITES, JSON.stringify([...houses])) */
      //this.favoritesHousesSubj.next([...houses])
      
    } catch (error) {
      console.log('error in addFavorite', error)
    }
  }

  getFavoritesHouses(): any {
    try {
      const favoritesHouses = JSON.parse(localStorage.getItem(MY_FAVORITES)!)
      return favoritesHouses;
    } catch (error) {
      console.log('error in getting Favorites', error)
    }
  }

  clearStorage(): void{
    try {
      localStorage.clear()
    } catch (error) {
      console.log('error in clearStorage', error)
    }
  }


  private initialStorage(MY_FAVORITES:string, localStorage: Storage):void{
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES)!)
    if(!currents){
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]))
    }
    this.getFavoritesHouses();
  } 
}
