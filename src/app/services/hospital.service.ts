import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Hospital} from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) {
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {headers: {'x-token': this.token}};
  }

  getHospitals() {
    return this.http.get(`${base_url}/hospitals`, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospitals: Hospital[] }) => resp.hospitals)
      );
  }

  createHospitals(name: string) {
    // @ts-ignore
    return this.http.post(`${base_url}/hospitals`, {name}, this.headers);
  }

  // tslint:disable-next-line:variable-name
  updateHospitals(_id: string, name: string) {
    return this.http.put(`${base_url}/hospitals/${_id}`, {name}, this.headers);
  }

  // tslint:disable-next-line:variable-name
  deleteHospitals(_id: string) {
    return this.http.delete(`${base_url}/hospitals/${_id}`, this.headers);
  }
}
