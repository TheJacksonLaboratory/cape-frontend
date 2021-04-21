import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchOption = 'variant';

  constructor(private auth: AuthenticationService, private router: Router) { }
  ngOnInit() {

  }

  onSelectedItem(event: any){

  }

  isGuest() {
    return this.auth.getUsername() == 'guest';
  }
}
