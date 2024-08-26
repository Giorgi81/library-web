import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  return !!localStorage.getItem('user')
};
