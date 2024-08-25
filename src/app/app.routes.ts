import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {MainComponent} from "./main/main.component";
import {DescComponent} from "./desc/desc.component";
// import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'main', component: MainComponent, },
  {path: 'desc/:id', component: DescComponent}
];


