import { Injectable } from '@angular/core';
import posts from '../../src/db.json';
import {Info} from "./main/interface";



@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  getItemById(id: number): any {
    throw new Error('Method not implemented.');
  }

  private item!: Info | undefined;

  constructor() {
    this.item = posts.posts[5];
  }

  setItem(itemReceived: Info) {
    this.item = itemReceived;
  }

  getItem() {
    return this.item;
  }
}
