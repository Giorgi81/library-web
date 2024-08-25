import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from "@angular/router";
import {MaterialModule} from "../../material/material.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(): void {
    if (this.username && this.password) {
      const loginData = {username: this.username, password: this.password};

      this.authService.saveLoginData(loginData);
      this.router.navigate(['/main'])
    }
  }
}
