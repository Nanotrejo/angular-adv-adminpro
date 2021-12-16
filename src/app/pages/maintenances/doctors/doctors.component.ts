import {Component, OnDestroy, OnInit} from '@angular/core';
import {DoctorService} from 'src/app/services/doctor.service';
import {Doctor} from '../../../models/doctor.model';
import {ModalImagenService} from 'src/app/services/modal-imagen.service';
import {delay} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Hospital} from '../../../models/hospital.model';
import {SearchService} from '../../../services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading = true;
  public doctors: Doctor[] = [];
  public tempDoctor: Doctor[] = [];
  public imgSubs: Subscription;

  constructor(private doctorService: DoctorService,
              private modalImagenService: ModalImagenService,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.getDoctors();


    this.imgSubs = this.modalImagenService.newImagen
      .pipe(delay(500)).subscribe(() => this.getDoctors());
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(doctors => {
        this.doctors = doctors;
        this.tempDoctor = doctors;
        this.loading = false;

      }
    );
  }

  search(search: string) {
    if (search.length === 0) {
      return this.doctors = this.tempDoctor;
    }

    this.searchService.search('doctor', search)
      .subscribe((resp: Hospital[]) => {
        this.doctors = resp;
      });
  }

  openModal(doctor: Doctor) {
    this.modalImagenService.openModal('doctors', doctor._id, doctor.img);
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id)
          .subscribe(resp => {
            this.getDoctors();
            Swal.fire(
              'Médico borrado',
              `${doctor.name} fue eleminado correctamente.`,
              'success'
            );
          });
      }
    });

  }

}
