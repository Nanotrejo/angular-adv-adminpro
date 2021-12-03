import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form-interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router
    , private ngZone: NgZone) {
    this.googleInit()
  }

  googleInit() {

    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {

        this.auth2 = gapi.auth2.init({
          client_id: '165482590331-aek8lfm032g8stdliqji8uhgupmp917j.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();

      });
    });
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }))
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }))
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }))
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login')
      })
    })
  }
}
