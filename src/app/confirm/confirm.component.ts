import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  confirmed = false;
  confirming = true;
  error = '';
  hide = true;
  token: string;
  message: string;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.userService.confirm(this.token).subscribe(resp => {
        this.message = resp['message'][0];
        var respCode = resp['message'][1];
        this.confirming = false;
        if (respCode == 200) {
          this.confirmed = true;
        } else {
          this.confirming = true;
        }
      });
    });
  }
}
