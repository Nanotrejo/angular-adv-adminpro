import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public user: User;

  // menuItems: any[];

  constructor(public sidebarService: SidebarService, private userService: UserService) {
    // this.menuItems = this.sidebarService.menu;
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

}
