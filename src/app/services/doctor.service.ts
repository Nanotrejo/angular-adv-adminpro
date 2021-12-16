import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Doctor} from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {headers: {'x-token': this.token}};
  }

  getDoctors() {
    return this.http.get(`${base_url}/doctors`, this.headers)
      .pipe(
        map((resp: { ok: boolean, doctor: Doctor[] }) => resp.doctor)
      );
  }

  getDoctorById(id: string) {
    return this.http.get(`${base_url}/doctors/${id}`, this.headers)
      .pipe(
        map((resp: { ok: boolean, doctor: Doctor }) => resp.doctor)
      );
  }

  createDoctor(doctor: { name: string, hospital: string }) {
    // @ts-ignore
    return this.http.post(`${base_url}/doctors`, doctor, this.headers);
  }

  // tslint:disable-next-line:variable-name
  updateDoctor(doctor: Doctor) {
    return this.http.put(`${base_url}/doctors/${doctor._id}`, doctor, this.headers);
  }

  // tslint:disable-next-line:variable-name
  deleteDoctor(_id: string) {
    return this.http.delete(`${base_url}/doctors/${_id}`, this.headers);
  }
}
