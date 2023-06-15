import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import {User} from "../User";
import {UserService} from "../user.service";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User | undefined;
  errorMessage: string | undefined;
  loggedin : boolean = false
  constructor(private userService: UserService, private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
      .subscribe(
        user => {
          this.user = user;
          console.log(user)
        },
        error => {
          this.errorMessage = error.message;
        }
      );
      if(this.authService.isUserLoggedIn()) {
        this.loggedin = true;
      }
      else {
        this.loggedin = false;
      }

  }
  getInfo() {
    this.userService.getUserInfo()
      .subscribe(
        user => {
          this.user = user;
          console.log(user.username)
        },
        error => {
          this.errorMessage = error.message;
          console.log(error)
        }
      );
  }

}
