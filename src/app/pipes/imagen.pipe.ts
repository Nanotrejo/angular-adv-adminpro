import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: 'users' | 'hospitals' | 'doctors'): string {
    if (!img) {
      return `${environment.base_url}/uploads/users/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${environment.base_url}/uploads/${type}/${img}`;
    }
    return `${environment.base_url}/uploads/users/no-image`;
  }

}
