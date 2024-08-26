import {CanActivateFn} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  return !!localStorage.getItem('loginData') && JSON.parse(localStorage.getItem('loginData') as string).loginData;
};
