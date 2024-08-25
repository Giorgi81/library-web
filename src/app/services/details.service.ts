import {Injectable} from '@angular/core';
import posts from '../../db.json';
import {Info} from "../main/interface";


@Injectable({
  providedIn: 'root'
})
export class DetailsService {


  private item!: Info | undefined;


  setItem(itemReceived: Info) {
    this.item = itemReceived;
  }

  getItem() {
    return this.item;
  }
}
