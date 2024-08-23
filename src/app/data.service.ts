import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  addPost(post: any) {
    return this.http.post(`${this.baseUrl}/posts`, post);
  }



}
