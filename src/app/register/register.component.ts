import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { AlertService, UserService } from '../_services';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    // this.registerForm = this.formBuilder.group({
    //   first_name: {value: null, disabled: true},
    //   last_name: {value: null, disabled: true},
    //   username: {value: null, disabled: true},
    //   email: {value: null, disabled: true},
    //   password: {value: null, disabled: true}
    // });

     // disable form after 2s
    //  setTimeout(() => this.registerForm.disable(), 2000);
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.error = 'The registration form is invalid';
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration', true);
          // Open dialog to let user know of successful registration
          const msgData = { 'title': 'Registration', 
                            'description': data['message'], 
                            'displayCancelButton': false };
          this.openResultDialog(msgData);
        },
        error => {
          this.alertService.error(error);
          this.error = error;
          this.loading = false;
        });
  }

  private openResultDialog(data: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/login']);
      this.loading = false;
      console.log(result);
    });
  }
}
