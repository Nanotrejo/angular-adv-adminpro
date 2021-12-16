// tslint:disable-next-line:class-name
interface _HospitalUser {
  _id: string;
  name: string;
  img: string;
}

export class Hospital {

  constructor(
    public _id: string,
    public name: string,
    public user?: _HospitalUser,
    public img?: string,
  ) {
  }

}
