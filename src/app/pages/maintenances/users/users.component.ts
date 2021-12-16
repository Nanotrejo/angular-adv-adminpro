import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {SearchService} from '../../../services/search.service';
import Swal from 'sweetalert2';
import {ModalImagenService} from 'src/app/services/modal-imagen.service';
import {delay} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  public usersTemp: User[] = [];
  public totalUsers = 0;
  public from = 0;
  public loading = true;

  public imgSubscription: Subscription;

  constructor(private userService: UserService,
              private searchService: SearchService,
              private modalImagenService: ModalImagenService) {
  }

  ngOnInit(): void {
    this.getUsers();

    this.imgSubscription = this.modalImagenService.newImagen
      .pipe(
        delay(500)
      )
      .subscribe(img => this.getUsers());
  }

  ngOnDestroy() {
    this.imgSubscription.unsubscribe();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({total, users}) => {
      this.totalUsers = total;
      if (users.length !== 0) {
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      }
    });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }

    this.getUsers();

  }

  search(search: string) {

    if (search.length === 0) {
      return this.users = this.usersTemp;
    }
    this.searchService.search('user', search)
      .subscribe((resp: User[]) => {
        this.users = resp;
      });
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo.', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user)
          .subscribe(resp => {
            this.getUsers();
            Swal.fire(
              'Usuario borrado',
              `${user.name} fue eleminado correctamente.`,
              'success'
            );
          });
      }
    });
  }

  changeRole(user: User) {
    this.userService.updateUserRole(user).subscribe(resp => console.log(resp));
  }

  openModal(user: User) {
    this.modalImagenService.openModal('users', user.uid, user.img);
  }
}
