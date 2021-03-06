import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];
  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       {title: 'Main', url: '/'},
  //       {title: 'ProgressBar', url: 'progress'},
  //       {title: 'Graphics', url: 'grafica1'},
  //       {title: 'Promises', url: 'promises'},
  //       {title: 'Rxjs', url: 'rxjs'},
  //     ]
  //   },
  //   {
  //     title: 'Maintenances',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {title: 'Users', url: 'users'},
  //       {title: 'Hospitals', url: 'hospitals'},
  //       {title: 'Doctors', url: 'doctors'},
  //     ]
  //   }
  // ];

  getMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
}
