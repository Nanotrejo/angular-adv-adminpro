import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
import {Hospital} from '../models/hospital.model';
import {map} from 'rxjs/operators';
import {Doctor} from '../models/doctor.model';

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

  private transformHospital(results: any[]): Hospital[] {
    return results;
  }

  private transformDoctor(results: any[]): Doctor[] {
    return results;
  }

  globalSearch(search: string) {
    return this.http.get<any[]>(`${base_url}/all/${search}`, this.headers);
  }

  search(type: 'user' | 'hospital' | 'doctor', search: string) {
    return this.http.get<any[]>(`${base_url}/all/collection/${type}/${search}`, this.headers)
      .pipe(
        map((resp: any) => {
            switch (type) {
              case 'user':
                return this.transformUsers(resp.data);
              case 'hospital':
                return this.transformHospital(resp.data);
              case 'doctor':
                return this.transformDoctor(resp.data);
              default:
                return [];
            }
          }
        )
      );
  }
}
