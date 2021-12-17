import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Grafica1Component} from './grafica1/grafica1.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromisesComponent} from './promises/promises.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {AuthGuard} from '../guards/auth.guard';
import {PerfilComponent} from './perfil/perfil.component';
import {UsersComponent} from './maintenances/users/users.component';
import {HospitalsComponent} from './maintenances/hospitals/hospitals.component';
import {DoctorsComponent} from './maintenances/doctors/doctors.component';
import {DoctorComponent} from './maintenances/doctors/doctor.component';
import {SearchComponent} from './search/search.component';
import {AdminGuard} from '../guards/admin.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
      {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Cuenta'}},
      {path: 'search/:search', component: SearchComponent, data: {titulo: 'Búsqueda'}},
      {path: 'promises', component: PromisesComponent, data: {titulo: 'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},

      {path: 'hospitals', component: HospitalsComponent, data: {titulo: 'Hospitals'}},
      {path: 'doctors', component: DoctorsComponent, data: {titulo: 'Doctors'}},
      {path: 'doctor/:id', component: DoctorComponent, data: {titulo: 'Doctor'}},


      {
        path: 'users',
        canActivate: [AdminGuard],
        component: UsersComponent, data: {titulo: 'Users'}
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}

