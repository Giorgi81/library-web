import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";

export const routes: Routes = [
  {path : 'login', component : LoginComponent },
  {path : '', redirectTo : 'login', pathMatch: 'full'},
  {path : 'main', component: MainComponent}
];
