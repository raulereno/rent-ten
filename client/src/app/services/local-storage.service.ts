import { Injectable } from '@angular/core';

const MY_FAVORITES: string = 'myFavorites';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
  
    this.initialStorage(MY_FAVORITES, localStorage);
  }

  darkmode(): any {
    try {
      const darkmode = JSON.parse(localStorage.getItem("darkmode")!)
      if(darkmode === undefined){
        return false
      }else{
        localStorage.setItem('darkmode',JSON.stringify(darkmode))
        return darkmode
      }
    } catch (error) {
      console.log("error in darkmode",error);
    }

  }
  addToFavorite(id: string): void {
    try {
      const currentFav = this.getFavoritesHouses();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentFav, id]));
    } catch (error) {
      console.log('error in addFavorite', error);
    }
  }

  removeFavorite(id: string): void {
    try {
      const currentFav = this.getFavoritesHouses();
      for (let i = 0; i < currentFav.length; i++) {
        if (id === currentFav[i]) {
          console.log('id', id);
          currentFav.splice(i, 1);
          localStorage.setItem(MY_FAVORITES, JSON.stringify(currentFav));
        }
      }
    } catch (error) {
      console.log('error in addFavorite', error);
    }
  }

  getFavoritesHouses(): any {
    try {
      const favoritesHouses = JSON.parse(localStorage.getItem(MY_FAVORITES)!);
      return favoritesHouses;
    } catch (error) {
      console.log('error in getting Favorites', error);
    }
  }

  private initialStorage(MY_FAVORITES: string, localStorage: Storage): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES)!);
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesHouses();
  }
}
