import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal = true;
  public type: 'users' | 'hospitals' | 'doctors';
  public id: string;
  public img: string;

  public newImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

  get ocultarModal() {
    return this._ocultarModal;
  }

  openModal(type: 'users' | 'hospitals' | 'doctors',
            id: string,
            img = 'no-img.jpg') {
    this._ocultarModal = false;
    this.type = type;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${type}/${img}`;
    }
  }

  closeModal() {
    this._ocultarModal = true;
  }
}
