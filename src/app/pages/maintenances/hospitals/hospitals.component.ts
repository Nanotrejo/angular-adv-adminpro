import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hospital} from '../../../models/hospital.model';
import {HospitalService} from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import {ModalImagenService} from '../../../services/modal-imagen.service';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {SearchService} from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading = true;
  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.getHospitals();

    this.imgSubs = this.modalImagenService.newImagen
      .pipe(delay(500)).subscribe(() => this.getHospitals());

  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe(hospitals => {
      this.hospitals = hospitals;
      this.hospitalsTemp = hospitals;
      this.loading = false;
    });
  }

  search(search: string) {
    if (search.length === 0) {
      return this.hospitals = this.hospitalsTemp;
    }

    this.searchService.search('hospital', search)
      .subscribe((resp: Hospital[]) => {
        this.hospitals = resp;
      });
  }

  saveHospital(hospital: Hospital) {
    this.hospitalService.updateHospitals(hospital._id, hospital.name)
      .subscribe(resp => {
          Swal.fire('Actulizado', hospital.name, 'success');
        }
      );
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospitals(hospital._id)
      .subscribe(resp => {
          this.getHospitals();
          Swal.fire('Eliminado', hospital.name, 'success');
        }
      );
  }

  async openModal() {
    const {value = ''} = await Swal.fire<string>({
      title: 'Create hospital',
      text: 'Insert the name of the new hospital',
      input: 'text',
      inputPlaceholder: 'Name of hospital',
      showCancelButton: true
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospitals(value)
        .subscribe((resp: any) => {
          this.hospitals.push(resp.hospital);
        });
    }
  }

  openModalImagen(hospital: Hospital) {
    this.modalImagenService.openModal('hospitals', hospital._id, hospital.img);
  }
}
