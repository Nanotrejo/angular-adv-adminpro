import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {User} from 'src/app/models/user.model';
import {Hospital} from 'src/app/models/hospital.model';
import {Doctor} from '../../models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private searchService: SearchService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getSearch();
  }

  getSearch() {
    this.activateRoute.params.subscribe(({search}) => {
      this.globalSearch(search);
    });
  }

  globalSearch(search: string) {
    this.searchService.globalSearch(search).subscribe((resp: any) => {
      this.users = resp.user;
      this.hospitals = resp.hospital;
      this.doctors = resp.doctor;
    });
  }

  openDoctor(doctor: Doctor) {
    this.router.navigateByUrl(`/dashboard/doctor/${doctor._id}`);
  }


}
