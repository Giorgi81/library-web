import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() {
  }

  saveLoginData(loginData: any) {
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }

  getLoginData(): any {
    const data = localStorage.getItem('loginData');
    return data ? JSON.parse(data) : null;
  }

}
