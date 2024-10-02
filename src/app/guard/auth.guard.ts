import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  private wagmiStore = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): 
  | Observable<boolean | UrlTree>
  | boolean {
    if (this.wagmiStore.state?.data?.account) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
};
