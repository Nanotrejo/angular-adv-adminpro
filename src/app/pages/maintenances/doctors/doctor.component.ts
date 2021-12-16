import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HospitalService} from '../../../services/hospital.service';
import {Hospital} from '../../../models/hospital.model';
import {DoctorService} from 'src/app/services/doctor.service';
import {Doctor} from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected: Hospital;
  public doctorSelected: Doctor;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private doctorService: DoctorService,
              private router: Router,
              private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(({id}) => this.getDoctor(id));

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.getHospitals();

    this.doctorForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSelected = this.hospitals.find(h => h._id === hospitalId);
      });
  }

  getDoctor(id: string) {
    if (id === 'new') {
      return;
    }
    this.doctorService.getDoctorById(id)
      .pipe(
        delay(500)
      )
      .subscribe(doctor => {

        const {name, hospital: {_id}} = doctor;
        this.doctorSelected = doctor;
        this.doctorForm.setValue({name, hospital: _id});

      }, error => this.router.navigateByUrl(`/dashboard/doctors`));
  }


  saveDoctor() {
    const {name} = this.doctorForm.value;

    if (this.doctorSelected) {
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      };
      this.doctorService.updateDoctor(data).subscribe(resp => {
        Swal.fire('Update doctor', `${name} update!`, 'success');
      });
    } else {
      this.doctorService.createDoctor(this.doctorForm.value).subscribe((resp: any) => {
        Swal.fire('Create doctor', `${name} create!`, 'success');
        this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`);
      });
    }
  }

  getHospitals() {
    this.hospitalService.getHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

}
