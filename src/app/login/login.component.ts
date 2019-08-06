import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username: string;
  password: string;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}


  ngOnInit() {

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  /**
   * 
   * @param authWithLDAP if true, login with LDAP
   */
  login(authWithLDAP): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.username === undefined || this.password === undefined) {
      return;
    }
    this.error = '';
    this.loading = true;
    this.authenticationService.login(this.username, this.password, authWithLDAP)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.alertService.error(error);
          this.loading = false;
        });
  }

  logout(): void {
    this.authenticationService.logout();
  }

  onKey(event: any) {
    // if enter key is pressed
    if (event.keyCode === 13) {
      this.login(true);
    }
  }
}
