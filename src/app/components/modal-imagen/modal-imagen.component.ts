import {Component, OnInit} from '@angular/core';
import {ModalImagenService} from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import {FileUploadService} from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {

  public imagenUp: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImagenService.closeModal();
  }

  changeImagen(file: File) {
    this.imagenUp = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImagen() {

    const id = this.modalImagenService.id;
    const type = this.modalImagenService.type;

    this.fileUploadService.updatePhoto(this.imagenUp, type, id)
      .then(img => {
        Swal.fire('Guardado', 'Se ha guardado correctamente', 'success');
        
        this.modalImagenService.newImagen.emit(img);

        this.closeModal();
      }).catch(err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
}
