import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  email: string="";
  password: string="";
  errorMessage: string="";

  constructor(private router: Router, private authService: AuthenticationService) {}

  signinUser() {
    this.authService.authenticate(this.email, this.password)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard'
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      );
  }
}
