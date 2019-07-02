import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ReportsService } from '../_services/reports.service';
import { User } from '../_models';
import { UserService } from '../_services';


@Component({templateUrl: 'home.component.html'})
export class HomeComponent {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  gOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
  }
}
