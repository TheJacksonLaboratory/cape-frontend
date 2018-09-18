import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthenticationService, AlertService} from '../_services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
  }


  ngOnInit() {

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  email: string;
  password: string;
  loading = false;
  returnUrl: string;

  login(): void {
    this.loading = true;
    this.authenticationService.login(this.email, this.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
