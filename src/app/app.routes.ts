import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {DescComponent} from "./desc/desc.component";

export const routes: Routes = [
  {path : 'login', component : LoginComponent },
  {path : '', redirectTo : 'login', pathMatch: 'full'},
  {path : 'main', component: MainComponent},
  {path : 'desc/:id', component :DescComponent }
];
