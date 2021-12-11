import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {headers: {'x-token': this.token}};
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid));
  }

  search(type: 'user' | 'hospital' | 'doctor',
         search: string) {
    return this.http.get<any[]>(`${base_url}/all/collection/${type}/${search}`, this.headers)
      .pipe(
        map((resp: any) => {
          switch (type) {
            case 'user':
              return this.transformUsers(resp.data);

            default:
              break;
          }
        })
      );
  }
}
