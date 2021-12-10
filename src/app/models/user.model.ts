import {environment} from '../../environments/environment';


export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {
  }

  getImage() {
    if (this.img && !this.google) {
      return `${environment.base_url}/uploads/users/${this.img}`;
    } else if (this.google) {
      return this.img.includes('https') ? this.img : `${environment.base_url}/uploads/users/${this.img}`;
    }
    return `${environment.base_url}/uploads/users/no-image`;
  }
}
