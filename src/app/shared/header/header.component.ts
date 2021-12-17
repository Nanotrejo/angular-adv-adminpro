import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService,
              private router: Router) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }

  search(value: string) {
    if (value.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/search/${value}`);
  }
}
