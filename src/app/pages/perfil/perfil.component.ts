import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {User} from '../../models/user.model';
import {FileUploadService} from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public imagenUp: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, private userService: UserService,
              private fileUploadService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe(() => {
      const {name, email} = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;

      Swal.fire('Guardado', 'Se ha guardado correctamente.', 'success');
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
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
    this.fileUploadService.updatePhoto(this.imagenUp, 'users', this.user.uid)
      .then(img => {
        this.user.img = img;
        Swal.fire('Guardado', 'Se ha guardado correctamente', 'success');
      }).catch(err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
