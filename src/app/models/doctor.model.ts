import {Hospital} from './hospital.model';

// tslint:disable-next-line:class-name
interface _DoctorUser {
  _id: string;
  name: string;
  img: string;
}

export class Doctor {

  constructor(
    public _id: string,
    public name: string,
    public user?: _DoctorUser,
    public img?: string,
    public hospital?: Hospital
  ) {
  }

}
