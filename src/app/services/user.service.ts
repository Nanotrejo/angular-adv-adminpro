import {HttpClient} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {RegisterForm} from '../interfaces/register-form.interface';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {Observable, of} from 'rxjs';
import {LoginForm} from '../interfaces/login-form-interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
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
      }));
  }

  updateUser(data: { name: string, email: string, role: string }) {
    data = {
      ...data,
      role: this.user.role
    };
    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {'x-token': this.token}
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }));
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }));
  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {'x-token': this.token}
    }).pipe(
      map((resp: any) => {
        const {name, email, google, role, uid, img} = resp.user;
        this.user = new User(name, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
