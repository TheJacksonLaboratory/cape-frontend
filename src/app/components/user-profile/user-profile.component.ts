import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../../_services/user.service';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  // hide password
  hide = true;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });
  private userSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSub = this.userService.getCurrentUser().subscribe(resp => {
      this.profileForm.patchValue({
        firstName: resp.first_name,
        lastName: resp.last_name,
        email: resp.email,
        username: resp.username,
        password: resp.password
      });
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
