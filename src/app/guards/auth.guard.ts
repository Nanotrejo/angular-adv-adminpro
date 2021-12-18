import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {UserService} from '../services/user.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.userService.validateToken()
      .pipe(
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigateByUrl('/login');
            localStorage.removeItem('token');
            localStorage.removeItem('menu');
          }
        }));
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.validateToken()
      .pipe(
        tap(isAuth => {
            if (!isAuth) {
              this.router.navigateByUrl('/login');
              localStorage.removeItem('token');
              localStorage.removeItem('menu');
            }
          }
        ));
  }
}
