import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  username: string;
  password: string;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  alertSub: Subscription;
  alert = '';
  previousUrl: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }


  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    this.alertSub = this.alertService.getMessage().subscribe(alert => {
      if (alert !== undefined && alert.type === 'error') {
        this.error = alert.message;
      } else if (alert !== undefined && alert.type === 'success') {
        this.alert = alert.message;
      }
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnDestroy(): void {
    this.alertSub.unsubscribe();
  }

  /**
   * Login to the App
   */
  login(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.username === undefined || this.password === undefined) {
      return;
    }
    this.error = '';
    this.loading = true;
    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error.message;
          this.loading = false;
        });
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.authenticationService.logout();
  }

  onKey(event: any) {
    // if enter key is pressed
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
