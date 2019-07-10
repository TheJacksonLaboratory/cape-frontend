import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./login/login.component.css']
})

export class AppComponent implements OnInit {
    title = 'CAPE';

    constructor(private auth: AuthenticationService, private router: Router) {}

    ngOnInit() {
        // We get the local time on the client machine and logout if the
        // timer in the localstorage (the token) is expired
        const timer = JSON.parse(localStorage.getItem('timer'));
        if (timer && (Date.now() > timer)) {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      }
}
